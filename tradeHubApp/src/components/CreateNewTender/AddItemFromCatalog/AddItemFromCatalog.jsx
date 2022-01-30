import React, {useEffect, useState} from 'react';
import styles from '../style';
import {ActivityIndicator, Text, View} from 'react-native';
import {Picker} from 'react-native-woodpicker';
import MainButton from '../../buttons/MainButton/MainButton';
import {Overlay} from 'react-native-elements';
import InputForm from '../../InputForm/InputForm/InputForm';
import CheckMarkIcon from '../../../ui/icons/CheckMarkIcon';
import CrossIcon from '../../../ui/icons/CrossIcon';
import COLORS from '../../../constants/Colors';

const AddItemFromCatalog = ({
                              categories = [],
                              showForm,
                              closeForm,
                              addItem,
                              getItem,
                              getCategory,
                              getItemList,
                            }) => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [category, setCategory] = useState({});
  const [subCategories, setSubCategories] = useState([[]]);
  const [subCategory, setSubCategory] = useState([]);
  const [itemFullObject, setItemFullObject] = useState({});
  const [amount, setAmount] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [amountErr, setAmountErr] = useState(false);
  const [maxPriceErr, setMaxPriceErr] = useState(false);
  const [loadPending, setLoadPending] = useState(false);

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
    setSelectedItem(item);
  };

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
      let itemData = {
        name: itemFullObject.name,
        item: {_id: itemFullObject._id},
        category: {_id: category.value},
        amount: Number(amount),
        maxPrice: Math.ceil(Number(maxPrice)),
        measureUnit: itemFullObject.measureUnit,
      };
      addItem(itemData);
      closeForm();
    }
  };

  const handleSetSubcategory = (data, index) => {
    let subcategoryArr = [...subCategory];
    subcategoryArr[index] = data;
    subcategoryArr.length = index + 1;
    setSubCategory([...subcategoryArr]);
  };

  return (
      <Overlay isVisible={showForm}
               overlayStyle={[styles.overlayContainer, {height: 600}]}
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

          <Text
              style={[styles.textOverlay, {lineHeight: 16, marginBottom: 10}]}>Виберіть
            товар з
            каталогу</Text>
          <View style={styles.overlayInputsContainer}>
            <Picker
                onItemChange={(data) => setCategory(data)}
                items={categories}
                title="Категорія товару"
                item={category}
                isNullable={true}
                style={styles.pikerInput}
                containerStyle={styles.containerStyle}
                placeholderStyle={styles.placeholderStyle}
                placeholder={'Категорія товару'}
            />
            {Array.isArray(subCategories) && !!subCategories?.length &&
            subCategories.map((subCat, index) =>
                <Picker
                    key={index}
                    onItemChange={(data) => handleSetSubcategory(data, index)}
                    items={subCat}
                    title="Виберіть підкатегорію"
                    item={subCategory[index]}
                    isNullable={true}
                    style={styles.pikerInput}
                    containerStyle={styles.containerStyle}
                    placeholderStyle={styles.placeholderStyle}
                    placeholder={'Виберіть підкатегорію'}
                />)
            }
            {Array.isArray(items) && !!items.length &&
            <Picker
                onItemChange={selectItem}
                items={items}
                title="Товар"
                item={selectedItem}
                isNullable={true}
                style={styles.pikerInput}
                containerStyle={styles.containerStyle}
                placeholderStyle={styles.placeholderStyle}
                placeholder={'Виберіть товар'}
            />}
            {!!selectedItem?.value &&
            <>
              <Text numberOfLines={4}>{itemFullObject?.description}</Text>
              <View style={{width: '50%'}}>
                <View>
                  <InputForm
                      required={true}
                      editable={true}
                      security={false}
                      label={`Кількість (${itemFullObject?.measureUnit})`}
                      selectTextOnFocus={true}
                      value={amount}
                      onChangeText={changeAmount}
                      keyboardType="numeric"
                      warning={amountErr}
                  />
                </View>
                <View>
                  <InputForm
                      required={true}
                      editable={true}
                      security={false}
                      label={`Максимальна ціна`}
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

          <View style={styles.buttonsContainer}>
            <View>
              <MainButton
                  width={80}
                  height={50}
                  onPress={closeForm}
                  label={'Назад'}
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
                  label={'Додати'}
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