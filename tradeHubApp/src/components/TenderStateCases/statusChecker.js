import i18n from '../../services/localization'

const statusChecker = status => {
  switch (status) {
    case 0:
      return i18n.t('new_processing');
    case 3:
      return i18n.t('choice_supplier');
    case 1:
      return i18n.t('requires_confirm');
    case 4:
      return i18n.t('docs');
    case 5:
      return i18n.t('delivery_expected');
    case 2:
      return i18n.t('confirmed');
    case 6:
      return i18n.t('delivery_success');
    default:
      break;
  }
};

export default statusChecker;
