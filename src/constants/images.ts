import {useAppSelector} from '@src/store/store';
import {useMemo} from 'react';

export const light = {
  splash: require('@images/light_splash.png'),
  splashLogo: require('@images/light_splash_logo.png'),
  logo: require('@images/logo.png'),
  welcome: require('@images/light_welcome_background.png'),
  welcomeImages: {
    simplifiedBuissness: require('@images/light_simplified_buissness.png'),
    dynamicTracking: require('@images/light_dynamic_tracking.png'),
    vitalityHub: require('@images/light_vitality_hub.png'),
    financialCenter: require('@images/light_financial_center.png'),
  },
  arrowLeft: require('@images/light_arrow_left.png'),
  showPassword: require('@images/show_password.png'),
  hidePassword: require('@images/hide_password.png'),
  otpNavbar: require('@images/light_verify_email_navbar.png'),
  google: require('@images/google_icon.png'),
  apple: require('@images/apple_icon.png'),
  surveyIndex: require('@images/survey-index-light.png'),
  surveyProgress: {
    one: require('@images/progress-bar-1.png'),
    two: require('@images/progress-bar-2.png'),
    three: require('@images/progress-bar-3.png'),
    four: require('@images/progress-bar-4.png'),
  },
  Card: {
    Bullet: require('@images/checkbox-light.png'),
    BulletFilled: require('@images/check-box-marked-light.png'),
  },

  dropDown: require('@images/dropDown.png'),
  addImage: require('@images/add_Image.png'),
  scanner: require('@images/scanner.png'),
  uploadCloud: require('@images/upload-cloud.png'),
  setupIcon: require('@images/setup_icon.png'),
  tickCircle: require('@images/tick-circle.png'),
  addCircle: require('@images/add-circle.png'),
  studio: require('@images/studio.png'),
  tasks: require('@images/tasks.png'),
  health: require('@images/health.png'),
  wallet: require('@images/wallet.png'),
  credit: require('@images/credit.png'),
  corpcrypt: require('@images/corpcrypt.png'),
  doc: require('@images/doc.png'),
  assets: require('@images/assets.png'),
  university: require('@images/university.png'),
  security: require('@images/security.png'),
  crm: require('@images/crm.png'),
  insights: require('@images/insights.png'),
  social: require('@images/social.png'),
  feedback: require('@images/feedback.png'),
  marketing: require('@images/marketing.png'),
  connect: require('@images/connect.png'),
  pay: require('@images/pay.png'),
  filter: require('@images/filter-light.png'),
  search: require('@images/search-icon-light.png'),
  moneyPurple: require('@images/purple-bill-light.png'),
  building: require('@images/buildings-icon.png'),
  brush: require('@images/brush-icon-light.png'),
  money: require('@images/money-icon-light.png'),
  orderSecurity: require('@images/security-icon-light.png'),
  calendarIcon: require('@images/calendar-light.png'),
  purpleTick: require('@images/tick-icon-purple.png'),
  threeDots: require('@images/three-dots-light.png'),
  pay: require('@images/pay.png'),
  element_4: require('@images/element-4.png'),
  defaultProfile: require('@images/defaultProfile.png'),
  arrowRight: require('@images/arrow-right.png'),
  arrowRightWhite: require('@images/arrow-right-white.png'),
  close: require('@images/close.png'),
  arrowRightPrimary: require('@images/arrow-right-primary.png'),
  buildings: require('@images/buildings.png'),
  goTo: require('@images/go-to.png'),
  moneys: require('@images/moneys.png'),
  homeGray: require('@images/home-grey.png'),
  homePrimary: require('@images/home-primary.png'),
  searchGrey: require('@images/search-grey.png'),
  searchPrimary: require('@images/search-primary.png'),
  updateGrey: require('@images/notification-grey.png'),
  updatePrimary: require('@images/notification-primary.png'),
  accountGrey: require('@images/profile-grey.png'),
  accountPrimary: require('@images/profile-primary.png'),
  importIcon: require('@images/import-icon-light.png'),
  viewDocIcon: require('@images/view-doc-light.png'),
  trackingStateActiveOne: require('@images/tracking-icon-active.png'),
  trackingStateActiveTwo: require('@images/tracking-icon-active-initial.png'),
  trackingStateDisableOne: require('@images/tracking-icon-disable.png'),
  trackingStateDisableTwo: require('@images/tracking-icon-disable-initial.png'),
  uploadIconSheet: require('@images/upload-icon-light.png'),
  scanIconSheet: require('@images/scan-icon-light.png'),
  dummyPotrait: require('@images/dummyPotrait.png'),
  dummyProgress: require('@images/dummyProgress.png'),
  goToPrimary: require('@images/go-to-primary.png'),
  dummyCalender: require('@images/dummyCalender.png'),
  chatBackground: require('@images/chat-background.png'),
  smsIcon: require('@images/sms-icon.png'),
  dummyProfileImage: require('@images/dummy_profile_image.png'),
  faceId: require('@images/face_ID.png'),
  cardImageSelected: require('@images/card_selected.png'),
  cardImageNotSelected: require('@images/card_notselected.png'),
  bankImageSelected: require('@images/bank_selected.png'),
  bankImageNotSelected: require('@images/bank_light.png'),
  clipIcon: require('@images/clip-icon-light.png'),
  sendMessage: require('@images/send-message-icon.png'),
  funding: require('@images/funding.png'),
  businessIdea: require('@images/businessIdea.png'),
  progress70: require('@images/progress-70.png'),
  dummyUpdate: require('@images/dummyUpdate.png'),
  filledCheckBox: require('@images/filledCheckBox.png'),
  dummyCalender1: require('@images/dummyCalender2.png'),
  close: require('@images/close_circle_light.png'),
  consulting: require('@images/consulting_light.png'),
  rightArrow: require('@images/right_arrow_light.png'),
  arrowDown: require('@images/arrow-down.png'),
  starBatch: require('@images/star-batch.png'),
  health20: require('@images/Low.png'),
  health40: require('@images/Mid-1.png'),
  health60: require('@images/Mid.png'),
  health80: require('@images/High.png'),
  health96: require('@images/Very High.png'),
  development: require('@images/Development-bro1.png'),
  buildingBlue: require('@images/buildings-skyblue.png'),
  paintBucket: require('@images/paintbucket.png'),
  docPrimary: require('@images/doc-primary.png'),
  copyRight: require('@images/copyright.png'),
  profile1: require('@images/profile-1.png'),
  docGreen: require('@images/doc-green.png'),
  docSkyBlue: require('@images/doc-skyblue.png'),
  folder: require('@images/folder.png'),
  agent: require('@images/agent.png'),
  startup: require('@images/startup_light.png'),
  global: require('@images/global_light.png'),
  fileImage: require('@images/fileImage_light.png'),
  bill: require('@images/bill_light.png'),
  contactimage: require('@images/contactImage_light.png'),
  services_module_0: require('@images/Services-Module-1-Light.png'),
  services_module_1: require('@images/Services-Module-3-Light.png'),
  services_module_2: require('@images/Services-Module-5-Light.png'),
  services_module_3: require('@images/Services-Module-0-Light.png'),
  services_module_4: require('@images/Services-Module-2-Light.png'),
  services_module_5: require('@images/Services-Module-6-Light.png'),
  services_module_6: require('@images/Services-Module-4-Light.png'),
  services_module_7: require('@images/Services-Module-7-Light.png'),
  services_module_8: require('@images/Services-Module-8-Light.png'),
  services_module_9: require('@images/Services-Module-9-Light.png'),
  services_module_10: require('@images/Services-Module-11-Light.png'),
  services_module_11: require('@images/Services-Module-10-Light.png'),
  services_module_12: require('@images/Services-Module-12-Light.png'),
  services_module_13: require('@images/Services-Module-13-Light.png'),
  services_module_14: require('@images/Services-Module-14-Light.png'),

  addCirclePrimary: require('@images/tick-circle-1.png'),
  seo: require('@images/SEO.png'),
  tickCircle2: require('@images/tick-circle-white.png'),
  notSelectedBR: require('@images/not-selected-icon-light.png'),
  selectedBR: require('@images/plus-icon-BR-light.png'),
  doneBR: require('@images/tick-icon-br.png'),

  checkBoxBR: require('@images/check-box-light.png'),
  checkBoxFilledBR: require('@images/check-box-light-filled.png'),
  plusIconBr: require('@images/plus-icon-purple.png'),
  minimize: require('@images/minimize-dark.png'),
  maximize: require('@images/maximize-dark.png'),
  logoSquare: require('@images/logoSquare.png'),
  minimize: require('@images/minmize.png'),
  maximize: require('@images/maximize.png'),
  logoSquare: require('@images/logoSquare.png'),
  documentIconReview: require('@images/document-icon-dark.png'),
  editIconPrimary: require('@images/edit-icon-purple.png'),
  emptyProgress: require('@images/empty-white.png'),
  tickPrimary: require('@images/tickPrimary_light.png'),
  Success: require('@images/success_light.png'),
  Error: require('@images/error_light.png'),
  HomeButton: require('@images/home_button.png'),
  HomeButtonPrimary: require('@images/home_button_primary.png'),
  Repeat: require('@images/repeat.png'),
  Detail: require('@images/detail.png'),
  Clock: require('@images/clock_light.png'),
  Cross: require('@images/cross_light.png'),
  ThreeDotsHeaderImage: require('@images/three_dots_light.png'),
  Share: require('@images/share.png'),
  Add: require('@images/add_light.png'),
  MasterCard: require('@images/mastercard_light.png'),
  Visa: require('@images/visa_light.png'),
  pencilPrimary: require('@images/pencilPrimary.png'),
  docGrey: require('@images/docGrey.png'),
  bookMarkIcon: require('@images/book-mark-icon-dark.png'),
  loanPicture_0: require('@images/govt-loan-pic-0.png'),
  loanPicture_1: require('@images/govt-loan-pic-1.png'),
  loanPicture_2: require('@images/govt-loan-pic-2.png'),
  loanPicture_3: require('@images/govt-loan-pic-3.png'),

  loanPictureDetails_0: require('@images/loan_pictures_details_0.png'),

  options: require('@images/option.png'),
  logoOrange: require('@images/logoOrange.png'),
  customerSupport: require('@images/customerSupport.png'),
  closeRBSheet: require('@images/closeRBSheet_light.png'),

  arrowLeftWhite: require('@images/arrow-left-white.png'),
  arrowUp: require('@images/arrow-up.png'),
  editDescription: require('@images/editDescription-dark.png'),
  addProfile: require('@images/profile-add.png'),
  emptyCheckBox: require('@images/CheckboxWhite.png'),
  dummyBrand2: require('@images/dummyBrandIcon.png'),
  dummyBrand1: require('@images/dunmyBrandIconLight.png'),
  repeatPrimary: require('@images/repeatPrimary.png'),
  uploadPrimary: require('@images/uploadPrimary.png'),
  trendMap: require('@images/worldTrendMapWhite.png'),
  USA: require('@images/USA.png'),
  It: require('@images/It.png'),
  NIG: require('@images/NIG.png'),
  AUS: require('@images/AUS.png'),
  POR: require('@images/POR.png'),
  IND: require('@images/IND.png'),
  CNI: require('@images/CNI.png'),
  FRN: require('@images/FRN.png'),
  Lock: require('@images/lock_light.png'),
  searchIcon: require('@images/search_light.png'),
  arrowSwap: require('@images/arrow_swap_light.png'),
  pdfIcon: require('@images/pdf_icon_light.png'),
  arrowCircleRight: require('@images/arrow_circle_right_light.png'),
  deleteIcon: require('@images/deleteIcon_light.png'),
  arrowRightRBSheet: require('@images/arrow_right_rbsheet_light.png'),
  pinBackgroundImage: require('@images/pin_background_image_light.png'),
  arrowLeftWhite: require('@images/arrow_left_white.png'),
  swatch: require('@images/swatch.png'),
  whiteCircle: require('@images/white_circle.png'),
  staric: require('@images/staric.png'),
  corpcryptLock: require('@images/corpcrypt_lock_light.png'),
  doeCompany: require('@images/doeCompany_light.png'),
  fixtop: require('@images/fixtop_light.png'),
  menu: require('@images/menu_light.png'),
  upload: require('@images/upload_light.png'),
  addIcon: require('@images/add_icon_light.png'),
  editIcon: require('@images/edit_icon_light.png'),
  addCircleIcon: require('@images/add_circle_light.png'),
  jpgIcon: require('@images/jpg_icon_light.png'),
  cameraIcon: require('@images/camera_icon_light.png'),
  scanIcon: require('@images/scan_icon_light.png'),
  uploadIcon: require('@images/upload_icon_light.png'),
  dummyPDF: require('@images/dummyPDF_light.png'),
  walletBackground: require('@images/wallet_background_light.png'),
  eyeIcon: require('@images/eye_light.png'),
  goToVectorIcon: require('@images/goTo_vector_icon_light.png'),
  sendIcon: require('@images/send_primary_icon.png'),
  receiveMoneyIcon: require('@images/money_receive_primary_icon.png'),
  addIconPrimary: require('@images/add_primary_icon.png'),
  cardIconPrimary: require('@images/card_icon_primary.png'),
  contactIcon: require('@images/contact_icon_light.png'),
  clearTextIconPrimary: require('@images/clear_text_icon_primary.png'),
  smsIcon: require('@images/sms_icon_light.png'),
  emmaCole: require('@images/emma_cole.png'),
  downloadPrimary: require('@images/download_primary.png'),
  addCirclePrimary: require('@images/add_circle_primary.png'),
  primaryDownloadIcon: require('@images/primary_download_icon.png'),
  editPrimaryIcon: require('@images/edit_primary_icon.png'),
  reminderIcon: require('@images/reminder_light.png'),
  checkBoxFilled: require('@images/checkbox_filled.png'),
  checkBoxNotFilled: require('@images/checkbox_notFilled.png'),
  walletIcon: require('@images/wallet_icon.png'),
  walletBG: require('@images/wallet-bg.jpg'),
  businessSuccess: require('@images/business-success.png'),
  business:{
    first: require('@images/business/1.png'),
    second: require('@images/business/2.png'),
    third: require('@images/business/3.png'),
    fourth: require('@images/business/4.png'),
    fifth: require('@images/business/5.png'),
    sixth: require('@images/business/6.png'),
    seventh: require('@images/business/7.png'),
    eight: require('@images/business/8.png'),
  }
};

export const dark = {
  splash: require('@images/dark_splash.png'),
  splashLogo: require('@images/dark_splash_logo.png'),
  logo: require('@images/logo.png'),
  welcome: require('@images/dark_welcome_background.png'),
  welcomeImages: {
    simplifiedBuissness: require('@images/dark_simplified_buissness.png'),
    dynamicTracking: require('@images/dark_dynamic_tracking.png'),
    vitalityHub: require('@images/dark_vitality_hub.png'),
    financialCenter: require('@images/dark_financial_center.png'),
  },
  arrowLeft: require('@images/dark_arrow_left.png'),
  showPassword: require('@images/show_password.png'),
  hidePassword: require('@images/hide_password.png'),
  otpNavbar: require('@images/dark_verify_email_navbar.png'),
  google: require('@images/google_icon.png'),
  apple: require('@images/apple_icon.png'),

  surveyIndex: require('@images/survey-index-dark.png'),
  surveyProgress: {
    one: require('@images/progress-bar-1.png'),
    two: require('@images/progress-bar-2.png'),
    three: require('@images/progress-bar-3.png'),
    four: require('@images/progress-bar-4.png'),
  },
  Card: {
    Bullet: require('@images/checkbox-dark.png'),
    BulletFilled: require('@images/check-box-marked-dark.png'),
  },

  dropDown: require('@images/dropDown.png'),
  addImage: require('@images/add_Image.png'),
  scanner: require('@images/scanner.png'),
  uploadCloud: require('@images/upload-cloud.png'),
  setupIcon: require('@images/setup_icon.png'),
  tickCircle: require('@images/tick-circle.png'),
  addCircle: require('@images/add-circle.png'),
  studio: require('@images/studio.png'),
  tasks: require('@images/tasks.png'),
  health: require('@images/health.png'),
  wallet: require('@images/wallet.png'),
  credit: require('@images/credit.png'),
  corpcrypt: require('@images/corpcrypt.png'),
  doc: require('@images/doc.png'),
  assets: require('@images/assets.png'),
  university: require('@images/university.png'),
  security: require('@images/security.png'),
  crm: require('@images/crm.png'),
  insights: require('@images/insights.png'),
  social: require('@images/social.png'),
  feedback: require('@images/feedback.png'),
  marketing: require('@images/marketing.png'),
  connect: require('@images/connect.png'),
  pay: require('@images/pay.png'),
  filter: require('@images/filter-dark.png'),
  search: require('@images/search-icon-dark.png'),
  moneyPurple: require('@images/purple-bill-dark.png'),
  building: require('@images/buildings-icon.png'),
  brush: require('@images/brush-icon-dark.png'),
  money: require('@images/money-icon-dark.png'),
  orderSecurity: require('@images/security-icon-dark.png'),
  calendarIcon: require('@images/calendar-dark.png'),
  purpleTick: require('@images/tick-icon-purple.png'),
  threeDots: require('@images/three-dots-dark.png'),
  pay: require('@images/pay.png'),
  defaultProfile: require('@images/defaultProfile.png'),
  arrowRightWhite: require('@images/arrow-right-white.png'),
  arrowRightPrimary: require('@images/arrow-right-primary.png'),
  buildings: require('@images/buildings.png'),
  goTo: require('@images/go-to.png'),
  homeGray: require('@images/home-grey.png'),
  homePrimary: require('@images/home-primary.png'),
  searchGrey: require('@images/search-grey.png'),
  searchPrimary: require('@images/search-primary.png'),
  updateGrey: require('@images/notification-grey.png'),
  updatePrimary: require('@images/notification-primary.png'),
  accountGrey: require('@images/profile-grey.png'),
  accountPrimary: require('@images/profile-primary.png'),
  importIcon: require('@images/import-icon-dark.png'),
  viewDocIcon: require('@images/view-doc-dark.png'),
  trackingStateActiveOne: require('@images/tracking-icon-active-dark.png'),
  trackingStateActiveTwo: require('@images/tracking-icon-active-initial-dark.png'),
  trackingStateDisableOne: require('@images/tracking-icon-disable-dark.png'),
  trackingStateDisableTwo: require('@images/tracking-icon-disable-initial-dark.png'),
  uploadIconSheet: require('@images/upload-icon-dark.png'),
  scanIconSheet: require('@images/scan-icon-dark.png'),
  element_4: require('@images/element-4-dark.png'),
  arrowRight: require('@images/arrow-right-white.png'),
  close: require('@images/close-dark.png'),
  moneys: require('@images/moneys-dark.png'),
  dummyPotrait: require('@images/dummyPotrait.png'),
  dummyProgress: require('@images/dummyProgress.png'),
  goToPrimary: require('@images/go-to-primary.png'),
  dummyCalender: require('@images/dummyCalender.png'),
  chatBackground: require('@images/chat-background-dark.png'),
  smsIcon: require('@images/sms-icon.png'),
  dummyProfileImage: require('@images/dummy_profile_image.png'),
  faceId: require('@images/face_ID.png'),
  cardImageSelected: require('@images/card_selected.png'),
  cardImageNotSelected: require('@images/card_dark_notselected.png'),
  bankImageSelected: require('@images/bank_selected.png'),
  bankImageNotSelected: require('@images/bank_dark.png'),
  clipIcon: require('@images/clip-icon-dark.png'),
  sendMessage: require('@images/send-message-icon.png'),
  funding: require('@images/funding.png'),
  businessIdea: require('@images/businessIdea.png'),
  progress70: require('@images/progress-70.png'),
  dummyUpdate: require('@images/dummyUpdate.png'),
  emptyCheckBox: require('@images/empty-checkbox-dark.png'),
  filledCheckBox: require('@images/filledCheckBox.png'),
  dummyCalender1: require('@images/dummyCalender2.png'),
  close: require('@images/close_circle_dark.png'),
  consulting: require('@images/consulting_dark.png'),
  rightArrow: require('@images/right_arrow_dark.png'),
  arrowDown: require('@images/arrow-down-dark.png'),
  starBatch: require('@images/star-batch.png'),
  health20: require('@images/Low.png'),
  health40: require('@images/Mid-1.png'),
  health60: require('@images/Mid.png'),
  health80: require('@images/High.png'),
  health96: require('@images/Very High.png'),
  development: require('@images/Development-bro1.png'),
  buildingBlue: require('@images/buildings-skyblue.png'),
  paintBucket: require('@images/paintbucket.png'),
  docPrimary: require('@images/doc-primary.png'),
  copyRight: require('@images/copyright.png'),
  profile1: require('@images/profile-1.png'),
  docGreen: require('@images/doc-green.png'),
  docSkyBlue: require('@images/doc-skyblue.png'),
  folder: require('@images/folder.png'),
  agent: require('@images/agent.png'),
  startup: require('@images/startup_dark.png'),
  global: require('@images/global_dark.png'),
  fileImage: require('@images/fileImage_dark.png'),
  bill: require('@images/bill_dark.png'),
  contactimage: require('@images/contactImage_dark.png'),

  services_module_0: require('@images/Services-Module-2-Dark.png'),
  services_module_1: require('@images/Services-Module-3-Dark.png'),
  services_module_2: require('@images/Services-Module-4-Dark.png'),
  services_module_3: require('@images/Services-Module-5-Dark.png'),
  services_module_4: require('@images/Services-Module-0-Dark.png'),
  services_module_5: require('@images/Services-Module-6-Dark.png'),
  services_module_6: require('@images/Services-Module-1-Dark.png'),
  services_module_7: require('@images/Services-Module-9-Dark.png'),
  services_module_8: require('@images/Services-Module-10-Dark.png'),
  services_module_9: require('@images/Services-Module-11-Dark.png'),
  services_module_10: require('@images/Services-Module-8-Dark.png'),
  services_module_11: require('@images/Services-Module-7-Dark.png'),
  services_module_12: require('@images/Services-Module-12-Dark.png'),
  services_module_13: require('@images/Services-Module-13-Dark.png'),
  services_module_14: require('@images/Services-Module-14-Dark.png'),

  addCirclePrimary: require('@images/tick-circle-1.png'),
  seo: require('@images/SEO.png'),
  tickCircle2: require('@images/tick-circle-white.png'),

  notSelectedBR: require('@images/not-selected-icon-dark.png'),
  selectedBR: require('@images/plus-icon-BR-dark.png'),
  doneBR: require('@images/tick-icon-br.png'),

  checkBoxBR: require('@images/check-box-dark.png'),
  checkBoxFilledBR: require('@images/check-box-dark-filled.png'),
  plusIconBr: require('@images/plus-icon-purple.png'),

  minimize: require('@images/minimize-dark.png'),
  maximize: require('@images/maximize-dark.png'),
  logoSquare: require('@images/logoSquare.png'),
  documentIconReview: require('@images/document-icon-white.png'),
  editIconPrimary: require('@images/edit-icon-purple.png'),
  emptyProgress: require('@images/empty-dark.png'),
  tickPrimary: require('@images/tickPrimary_dark.png'),
  Success: require('@images/success_light.png'),
  Error: require('@images/error_dark.png'),
  HomeButton: require('@images/home_button.png'),
  HomeButtonPrimary: require('@images/home_button_primary.png'),
  Repeat: require('@images/repeat.png'),
  Detail: require('@images/detail.png'),
  Clock: require('@images/clock_dark.png'),
  Cross: require('@images/cross_dark.png'),
  ThreeDotsHeaderImage: require('@images/three_dots_dark.png'),
  Share: require('@images/share.png'),
  Add: require('@images/add_dark.png'),
  MasterCard: require('@images/mastercard_dark.png'),
  Visa: require('@images/visa_dark.png'),
  pencilPrimary: require('@images/pencilPrimary.png'),
  docGrey: require('@images/docGrey.png'),
  bookMarkIcon: require('@images/book-mark-icon-light.png'),
  loanPicture_0: require('@images/govt-loan-pic-0.png'),
  loanPicture_1: require('@images/govt-loan-pic-1.png'),
  loanPicture_2: require('@images/govt-loan-pic-2.png'),
  loanPicture_3: require('@images/govt-loan-pic-3.png'),
  loanPictureDetails_0: require('@images/loan_pictures_details_0.png'),
  options: require('@images/option.png'),
  logoOrange: require('@images/logoOrange.png'),
  customerSupport: require('@images/customerSupport.png'),
  closeRBSheet: require('@images/closeRBSheet_dark.png'),
  arrowLeftWhite: require('@images/arrow-left-white.png'),
  arrowUp: require('@images/arrow-up-dark.png'),
  editDescription: require('@images/editDescription.png'),
  addProfile: require('@images/profile-add-white.png'),
  dummyBrand2: require('@images/dunmyBrandIconLight.png'),
  dummyBrand1: require('@images/dummyBrandIcon.png'),
  repeatPrimary: require('@images/repeatPrimary.png'),
  uploadPrimary: require('@images/uploadPrimary.png'),
  trendMap: require('@images/worldTrendMap.png'),
  USA: require('@images/USA.png'),
  It: require('@images/It.png'),
  NIG: require('@images/NIG.png'),
  AUS: require('@images/AUS.png'),
  POR: require('@images/POR.png'),
  IND: require('@images/IND.png'),
  CNI: require('@images/CNI.png'),
  FRN: require('@images/FRN.png'),
  Lock: require('@images/lock_dark.png'),
  searchIcon: require('@images/search_dark.png'),
  arrowSwap: require('@images/arrow_swap_dark.png'),
  pdfIcon: require('@images/pdf_icon_dark.png'),
  arrowCircleRight: require('@images/arrow_circle_right_dark.png'),
  deleteIcon: require('@images/deleteIcon_dark.png'),
  arrowRightRBSheet: require('@images/arrow_right_rbsheet_dark.png'),
  pinBackgroundImage: require('@images/pin_background_image_light.png'),
  arrowLeftWhite: require('@images/arrow_left_white.png'),
  swatch: require('@images/swatch.png'),
  whiteCircle: require('@images/white_circle.png'),
  staric: require('@images/staric.png'),
  corpcryptLock: require('@images/corpcrypt_lock_dark.png'),
  doeCompany: require('@images/doeCompany_dark.png'),
  fixtop: require('@images/fixtop_dark.png'),
  menu: require('@images/menu_dark.png'),
  upload: require('@images/upload_dark.png'),
  addIcon: require('@images/add_icon_light.png'),
  editIcon: require('@images/edit_icon_dark.png'),
  addCircleIcon: require('@images/add_circle_dark.png'),
  jpgIcon: require('@images/jpg_icon_dark.png'),
  cameraIcon: require('@images/camera_icon_dark.png'),
  scanIcon: require('@images/scan_icon_dark.png'),
  uploadIcon: require('@images/upload_icon_dark.png'),
  dummyPDF: require('@images/dummyPDF_light.png'),
  walletBackground: require('@images/wallet_background_light.png'),
  eyeIcon: require('@images/eye_dark.png'),
  goToVectorIcon: require('@images/goTo_vector_icon_light.png'),
  sendIcon: require('@images/send_primary_icon.png'),
  receiveMoneyIcon: require('@images/money_receive_primary_icon.png'),
  addIconPrimary: require('@images/add_primary_icon.png'),
  cardIconPrimary: require('@images/card_icon_primary.png'),
  contactIcon: require('@images/contact_icon_dark.png'),
  clearTextIconPrimary: require('@images/clear_text_icon_primary.png'),
  smsIcon: require('@images/sms_icon_dark.png'),
  emmaCole: require('@images/emma_cole.png'),
  downloadPrimary: require('@images/download_primary.png'),
  addCirclePrimary: require('@images/add_circle_primary.png'),
  primaryDownloadIcon: require('@images/primary_download_icon.png'),
  editPrimaryIcon: require('@images/edit_primary_icon.png'),
  reminderIcon: require('@images/reminder_dark.png'),
  checkBoxFilled: require('@images/checkbox_filled.png'),
  checkBoxNotFilled: require('@images/checkbox_notFilled.png'),
  walletIcon: require('@images/wallet_icon.png'),
  walletBG: require('@images/wallet-bg.jpg'),
  businessSuccess: require('@images/business-success.png'),
  business:{
    first: require('@images/business/1-b.png'),
    second: require('@images/business/2-b.png'),
    third: require('@images/business/3-b.png'),
    fourth: require('@images/business/4-b.png'),
    fifth: require('@images/business/5-b.png'),
    sixth: require('@images/business/6-b.png'),
    seventh: require('@images/business/7-b.png'),
    eight: require('@images/business/8-b.png'),
  }
};

export const useThemeImages = () => {
  const common = useAppSelector((state: any) => state.common);
  return useMemo(
    () => (common.theme === 'dark' ? dark : light),
    [common.theme],
  );
};
