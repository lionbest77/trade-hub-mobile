import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import styles from '../style';
import { ActivityIndicator, Text, View, Dimensions, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { ButtonGroup, Divider } from 'react-native-elements';
import {Picker} from 'react-native-woodpicker';
import { Formik } from "formik";
import MainButton from '../../buttons/MainButton/MainButton';
import {Overlay} from 'react-native-elements';
import InputForm from '../../InputForm/InputForm/InputForm';
import ModifiedInputForm from '../../InputForm/InputForm/ModifiedInputForm';
import CheckMarkIcon from '../../../ui/icons/CheckMarkIcon';
import CrossIcon from '../../../ui/icons/CrossIcon';
import { DEFAULT_URL } from '../../../constants/Req';
import COLORS from '../../../constants/Colors';
import InformText from '../../../ui//InformText/InformText';
// import validationSchema from ".";

import i18n from '../../../services/localization'

import Tab from "../../Tab/Tab"; 

const AddItemFromCatalog = ({
                              categories = [],
                              showForm,
                              closeForm,
                              addItem,
                              getItem,
                              getCategory,
                              getItemList,
                              screenNumber = 0,
                              getScreenNumber,
                              getRootCategoryByCategoryId,
                              userToken,
                            }) => {
  const [items, setItems] = useState([]);
  const [searchedProductTitle, setSearchedProductTitle] = useState('');
  const [productsList, setProductsList] = useState([]);
  const [similarProductList, setSimilarProductList] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [category, setCategory] = useState({});
  const [categoryList, setCategoryList] = useState([]);
  const [productCategories, setProductCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([[]]);
  const [subCategory, setSubCategory] = useState([]);
  const [itemFullObject, setItemFullObject] = useState({});
  const [amount, setAmount] = useState();
  const [tempAmount, setAmountTemp] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [amountErr, setAmountErr] = useState(false);
  const [maxPriceErr, setMaxPriceErr] = useState(false);
  const [loadPending, setLoadPending] = useState(false);
  const [productScreenGroupNumber, setProductScreenGroupNumber] = useState(0);

  const formRef = useRef(null);

  let { width } = Dimensions.get("window");

  const loadItemsFromCategory = async (categoryId) => {
    await getItemList(categoryId).then(res => {
      if (Array.isArray(res)) {
        setItems(res.map(item => ({label: item.name, value: item._id})));
      }
    }).catch(err => console.log('Error get items', err));
  };

  const loadSubcategoryList = async (categoryId, index) => {
    await getCategory(categoryId).then(res => {
          if (Array.isArray(res?.child_categories) &&
              res.child_categories.length) {
            let list = res.child_categories.map(
                item => ({label: item.name, value: item._id}));
            // console.log('SUBCATEGORIES:', index, list);
            let subCats = [...subCategories];
            subCats[index] = list;
            subCats.length = index + 1;
            setSubCategories([...subCats]);
          }
        },
    ).catch(err => console.log('Error get subcategories', err));
  }; 

  const getItemsFromCategory = async (id) => {
    // console.log(userToken);
    // console.log(id);
    return await axios
      .get(`${DEFAULT_URL}/categories/${id}/recursive`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then(({ data }) => data)
      .catch((err) => console.log('error', err));
  };

  // const getProductById = async (itemId) => {
  //   return fetch(`${DEFAULT_URL}/items/${itemId}`,
  //       {headers: {'Authorization': `Bearer ${userToken}`}},
  //   ).then(res => res.json())
  //    .then(res => {
  //     // console.log(res);
  //     console.log("------------");
  //     console.log(res);
  //     console.log("------------");
  //   });;
  // };


  const getProductCategories = async () => {
    return await fetch(`${DEFAULT_URL}/categories/root`,
        {headers: {'Authorization': `Bearer ${userToken}`}},
    ).then(res => res.json(), err => {
      console.log('Error get categories,', err);
    }).then(res => res);
    // .then(res => {
    //   // console.log(res);
    //   // let obj = ;
    //   // setProductCategories(res.map(item => ({label: item.name, value: item._id})));
    //   return res;
    //   // console.log('CATEGORIES:', res);
    //   // return obj;
    // });
  };

  const fetchItemsByCategory = async () => {
    let commonProductList = [];

    productCategories.map(
      (async (item, index) => {
      // const allItemsFromCategory = await getItemsFromCategory(catId) || [];

        return await getItemsFromCategory(item.value)
          .then((data) => {
            const categoryItems = data || [];
            console.log("first promise");

            return categoryItems.map((category) => ({ label: category.name, value: category._id }));
          })
          .then((refactoredCatItems) => {

            console.log(`last promise | refatored data length: ${refactoredCatItems.length}`);
            // commonProductList = commonProductList.concat(refactoredCatItems)
            setProductsList((prev) => prev.concat(refactoredCatItems));
            console.log(`----- ProductsList length: ${productsList.length} ------`);
            
          });
      })
    );

    return commonProductList;
  }

  const fetchAndSetProductList = async () => {
    // const tempCatIdStr = "3ec93544-ef49-44d5-b518-b2f8c95b7171";
    setProductsList([]);
    console.log("Fetching...");
    await getProductCategories().then((res => {
      // console.log("cat then");
      // console.log(res);
      res.map(
        (async (item, index) => {
          return await getItemsFromCategory(item._id)
            .then((data) => {
              const categoryItems = data || [];
              return categoryItems.map((category) => ({ label: category.name, value: category._id }));
            })
            .then((refactoredCatItems) => {
              setProductsList((prev) => prev.concat(refactoredCatItems));
            });
        })
      )
    }));

    // fetchItemsByCategory().then((data) => {
    //   console.log(`data received: ${data}`);
    //   // setProductsList(data);
    //   console.log(data.length);
    // })

    // await productCategories.map(async (item, index) => {
    //   let catId = item.value;
    //   const allItemsFromCategory = (await getItemsFromCategory(catId)) || [];

    //   // console.log(`allItemsFromCategory length [index ${index}]: ${allItemsFromCategory.length}`);
    //   console.log("Это выведется только после done");
    //   allItemsFromCategory.forEach((category) => {
    //     commonProductList.push({ label: category.name, value: category._id });
    //   });

    //   // for (const [key, value] of Object.entries(preparedItemsFromCategoryObj)) {
    //   //   preparedItemsFromCategory.push({ label: key, value: value });
    //   //   console.log(`${key}: ${value}`);
    //   // }

    //   // let itemsFromCategory = getItemsFromCategory(item.value) || [];
    //   // preparedItemsFromCategory.forEach((item) => commonProductList.push(item));
    //   //commonProductList = commonProductList.concat(itemsFromCategory);
    //   // console.log(commonProductList.length);
    // });
    // console.log("done");
    // console.log(productsList);
  }

  const getProductOfSimilarName = (searchProductName) => {
    if(!productsList || searchProductName === '' || searchProductName === ' ') return;

    let similarProducts = [
      // {id: "3bd234f4-1889-4eaa-86bd-7f63d6be5569", name: "1537109 Фільтр паливний (БРСМ (номенклатура))"},
      // {id: "a8596db8-05db-4cca-8731-67fd633cb3cf", name: "1537110 Фільтр мастильний Е-5 (БРСМ (номенклатура))"},
      // {id: "9438cdc5-c2e0-45a1-902d-12e9edc4adf8", name: "1537148 Фільтр кабіни (БРСМ (номенклатура))"},
    ];
    // TODO: get similar product by name

    console.log(`productsList: ${productsList.length}`);

    for (var i = 0; i < productsList.length - 1; i++) {
      // console.log(productsList[i].label);
      let item = productsList[i];

      if(item != null && item.label
          && item.label.includes(searchProductName)
        ) {
        similarProducts.push(item);
      }
   }

    // productsList.forEach((item) => {
    //   // if(item != null
    //   //   && typeof item.name === 'string' 
    //   //   || item.name instanceof String 
    //   //   && item.name.includes(searchProductName)
    //   // ) {
    //     console.log(item.value);
    //     // let product = await item;
    //     // console.log(product);
    //     // console.log(product.value);
    //     if(item != null && item.value
    //       && item.name?.includes(searchProductName)
    //     ) {
    //     similarProducts.push(item);
    //   }
    // });

    setSimilarProductList(similarProducts);
  }

  useEffect(async () => {
    // await getCategories()
    console.log("getting categories...");

    // await getProductCategories();

    // console.log(`product cat length: ${productCategories.length}`);
    // console.log("fetching and set products...");

    await fetchAndSetProductList()

    console.log("Products setted successfuly");
    // getProductById("180c4dfd-b3d2-405b-9c57-2fde1fecfa17")
    return () => {
      setProductsList([]);
    }
  }, []);

  useEffect(() => {
    setSelectedItem({});
    setSubCategory([]);
    setSubCategories([]);
    if (category?.value) {
      setLoadPending(true);
      loadSubcategoryList(category.value, 0).
          then(res => loadItemsFromCategory(category.value)).
          finally(() => setLoadPending(false));
    }
  }, [category]);

  useEffect(() => {
    setSelectedItem({});
    if (subCategory.length > 0 && subCategory[subCategory.length - 1]?.value) {
      setLoadPending(true);
      const hasEntry = (arr, elemId) => {
        if (!Array.isArray(arr)) return false;
        return arr.findIndex(arrItem => arrItem?.value === elemId) >= 0;
      };
      let index = subCategories.findIndex(
          item => hasEntry(item, subCategory[subCategory.length - 1].value));
      loadSubcategoryList(subCategory[subCategory.length - 1].value, index + 1);
      loadItemsFromCategory(subCategory[subCategory.length - 1].value).
          finally(() => setLoadPending(false));
    }
  }, [subCategory]);

  useEffect(() => {
    if (selectedItem?.value) {
      getItem(selectedItem?.value).then(res => {
        setItemFullObject(res);
      }).catch(err => console.warn('Error get item', err));
    } else {
      setItemFullObject({});
    }
  }, [selectedItem]);

  useEffect(() => {
    if (!showForm) {
      setCategory({});
      setItems([]);
      setItemFullObject({});
      setSelectedItem({});
      setSubCategories([]);
      setSubCategory([]);
      setAmount('');
      setMaxPrice('');
    }
  }, [showForm]);

  const selectItem = (item) => {
    console.log(`select item: ${JSON.stringify(item)}`);
    setSelectedItem(item);
  };

  const onProductNameChanged = data => {
    //console.log(data);
    setSearchedProductTitle(data);
    getProductOfSimilarName(data);
  }

  const changeAmount = data => {
    setAmount(data);
    if (isNaN(Number(data))) {
      setAmountErr(true);
    } else {
      setAmountErr(false);
    }
  };

  const changeMaxPrice = data => {
    setMaxPrice(data);
    if (isNaN(Number(data))) {
      setMaxPriceErr(true);
    } else {
      setMaxPriceErr(false);
    }
  };

  const handleAddItem = () => {
    if (itemFullObject?._id && !isNaN(Number(amount)) &&
        !isNaN(Number(maxPrice))) {

      // console.log(itemFullObject);
      console.log();

      getRootCategoryByCategoryId(itemFullObject.category._id)
          .then((res) => {
            let parentCategory = itemFullObject.category._id;

            if(res.parent_category) {
              parentCategory = res.parent_category._id;
            }

            console.log(`parentCategory: ${parentCategory}`);

            let itemData = {
              name: itemFullObject.name,
              item: {_id: itemFullObject._id},
              category: {_id: parentCategory},
              amount: Number(amount),
              maxPrice: Math.ceil(Number(maxPrice)),
              measureUnit: itemFullObject.measureUnit,
            };
            addItem(itemData);
            closeForm();
          });
    }
  };

  const handleSetSubcategory = (data, index) => {
    let subcategoryArr = [...subCategory];
    subcategoryArr[index] = data;
    subcategoryArr.length = index + 1;
    setSubCategory([...subcategoryArr]);
  };

  const buttons = [
    {
      element: () => (
        <Tab
          buttonIndex={0}
          label={i18n.t('from_catalog')}
          selectedIndex={ productScreenGroupNumber }
        />
      )
    },
    {
      element: () => (
        <Tab
          buttonIndex={1}
          label={i18n.t('by_name')}
          selectedIndex={ productScreenGroupNumber }
          alignmentRight
        />
      )
    }
  ];

  const onButtonGroupClick = index => {
    setProductScreenGroupNumber(index);
  }

  const ComponentSelectFromCatalog = () => {
    return (
      <View style={styles.overlayInputsContainer}>
        <Picker
            onItemChange={(data) => setCategory(data)}
            items={categories}
            title={i18n.t('product_category')}
            item={category}
            isNullable={true}
            style={styles.pikerInput}
            containerStyle={styles.containerStyle}
            placeholderStyle={styles.placeholderStyle}
            textInputStyle={styles.textInputStyle}
            placeholder={i18n.t('product_category')}
        />
        {Array.isArray(subCategories) && !!subCategories?.length &&
        subCategories.map((subCat, index) =>
            <Picker
                key={index}
                onItemChange={(data) => handleSetSubcategory(data, index)}
                items={subCat}
                title={i18n.t('product_subcategory')}
                item={subCategory[index]}
                isNullable={true}
                style={styles.pikerInput}
                containerStyle={styles.containerStyle}
                placeholderStyle={styles.placeholderStyle}
                textInputStyle={styles.textInputStyle}
                placeholder={i18n.t('product_subcategory')}
            />)
        }
        {Array.isArray(items) && !!items.length &&
        <Picker
            onItemChange={selectItem}
            items={items}
            title={i18n.t('goods')}
            item={selectedItem}
            isNullable={true}
            style={styles.pikerInput}
            containerStyle={styles.containerStyle}
            placeholderStyle={styles.placeholderStyle}
            textInputStyle={styles.textInputStyle}
            placeholder={i18n.t('choose_product')}
            multiline={true}
            numberOfLines={2}
        />}
        {!!selectedItem?.value &&
        <>
          {/* <Text style={{ marginBottom: '2%' }}>Товар до заказу</Text> */}
          <Text style={{ fontWeight: 'bold', marginBottom: '5%' }} numberOfLines={4}>{itemFullObject?.name}</Text>
          <View style={{width: '50%'}}>
            <View>
              <ModifiedInputForm
                  required={true}
                  editable={true}
                  security={false}
                  label={`${i18n.t('quantity')} (${itemFullObject?.measureUnit})`}
                  selectTextOnFocus={true}
                  value={amount}
                  onChangeText={changeAmount}
                  keyboardType="numeric"
                  warning={amountErr}
              />
            </View>
            <View>
              <ModifiedInputForm
                  required={true}
                  editable={true}
                  security={false}
                  label={i18n.t('max_price')}
                  selectTextOnFocus={true}
                  value={maxPrice}
                  onChangeText={changeMaxPrice}
                  keyboardType="numeric"
                  warning={maxPriceErr}
              />
            </View>

          </View>
        </>
        }
      </View>
    );
  }

  const ProductItemComponent = ({item}) => {
    return (
      <TouchableOpacity onPress={ () => { 
          selectItem(item);
          formRef.current.scrollToEnd({ animated: true });
        } }>
        <View style={ styles.productItemContainer }> 
          <Text style={ styles.productItemText }>{ item.label }</Text>
        </View>
      </TouchableOpacity>
      
    );
  }

  const ComponentSelectBySearchProductName = () => {
    return (
      <View style={ styles.selectBySearchContainer }>
        <View style={ styles.selectBySearchContainerForm }>
          <ModifiedInputForm
              required={true}
              editable={true}
              security={false}
              label={i18n.t('enter_product_name')}
              selectTextOnFocus={true}
              value={searchedProductTitle}
              onChangeText={ onProductNameChanged }
              // keyboardType="text"
              warning={false}
          />
        </View>
        <ScrollView style={{ width: "100%" }} nestedScrollEnabled = {true}>
          <View style={{ height: "30%" }}>
            {
              similarProductList.length > 0 
                ? (
                  similarProductList.map((item, index) => (
                    <ProductItemComponent key={`${index}`} item={ item }/>
                  ))
                ) 
                : (
                    <View 
                        style={{
                          marginTop: '25%',
                          paddingHorizontal: '5%',
                        }}
                    >
                      <InformText>{i18n.t('no_such_product')}</InformText>
                    </View>
                )
            }
          </View>
        </ScrollView>
        { // Папір
          !!selectedItem?.value &&
          <View>
            {/* <Text style={{ marginBottom: '2%' }}>Товар до заказу</Text> */}
            <Text style={{ 
              marginTop: "10%", 
              fontWeight: 'bold', 
              marginBottom: '5%' 
            }} numberOfLines={4}>{ itemFullObject?.name }</Text>
            <View style={{width: '50%'}}>
              <View>
                <ModifiedInputForm
                    required={true}
                    editable={true}
                    security={false}
                    label={`${i18n.t('quantity')} (${itemFullObject?.measureUnit})`}
                    selectTextOnFocus={true}
                    value={amount}
                    onChangeText={changeAmount}
                    keyboardType="numeric"
                    warning={amountErr}
                />
              </View>
              <View>
                <ModifiedInputForm
                    required={true}
                    editable={true}
                    security={false}
                    label={i18n.t('max_price')}
                    selectTextOnFocus={true}
                    value={maxPrice}
                    onChangeText={changeMaxPrice}
                    keyboardType="numeric"
                    warning={maxPriceErr}
                />
              </View>

            </View>
          </View>
        }
      </View>
    );
  }

  return (
      <Overlay 
        isVisible={showForm}
        overlayStyle={[styles.overlayContainer, {height: 650}]}
        onBackdropPress={closeForm}
      >
        <View style={{flex: 1}}>
          {loadPending && <View
              style={{
                position: 'absolute', top: '50%', left: 0, zIndex: 100,
                alignItems: 'center', width: '100%',
              }}
          >
            <ActivityIndicator size="large" color={COLORS.main}/>
          </View>}

          <Text style={[styles.textOverlay, {lineHeight: 16, marginBottom: 10}]}>
            {i18n.t('choose_product')}
          </Text>

          <View style={{ paddingHorizontal: width >= 600 ? 45 : 25 }}>
            <ButtonGroup
              buttons = { buttons }
              onPress = { index => onButtonGroupClick(index) }
              selectedIndex = { productScreenGroupNumber }
              containerStyle = { styles.tabsContainer }
              selectedButtonStyle = { styles.buttonsGroupContainer }
              innerBorderStyle = {{ color: "#fff" }}
            />
          </View>

          <ScrollView ref={formRef} nestedScrollEnabled = {true}>
            <View style={{ flex: 1, paddingTop: 30, paddingBottom: 25 }}>
              {(() => { 
                switch (productScreenGroupNumber) {
                  case 0:
                    return <ComponentSelectFromCatalog />;
                  case 1:
                    return <ComponentSelectBySearchProductName />;
                  default:
                    return null;
                }
              })()}
            </View>
          </ScrollView>


          <View style={styles.buttonsContainer}>
            <View>
              <MainButton
                  width={80}
                  height={50}
                  onPress={closeForm}
                  label={i18n.t('back')}
                  leftBorderNone
                  icon={<CrossIcon/>}
              />
            </View>
            <View>
              <MainButton
                  backgroundColor={'#27AE60'}
                  width={80}
                  height={50}
                  onPress={handleAddItem}
                  label={i18n.t('add')}
                  rightBorderNone
                  disabled={!(itemFullObject._id && amount && maxPrice)}
                  icon={<CheckMarkIcon/>}
              />
            </View>

          </View>
        </View>
      </Overlay>
  );

};

export default AddItemFromCatalog;