const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

const errorText = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хэштегов`,
  NOT_UNIQUE: 'Хэштеги должны быть уникальными',
  INVALID_PATTERN: 'Неправилбный хэштег',
};

const escapeName = 'Escape';

const firstOrder = 1;
const secondOrder = 2;
const thirthOrder = 3;

const fileField = document.querySelector('.img-upload__input');
const overlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const closeButton = document.querySelector('.img-upload__cancel');
const hashtagField = document.querySelector('.text-hashtags');
const commentField = document.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const showModal = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const hideModal = () => {
  form.reset();
  pristine.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    const data = new FormData(form);
    fetch('https://30.javascript.pages.academy/kekstagram', {
      method: 'POST',
      body: data
    });
  } else {
    console.log('Форма невалидна');
  }
};

const isTextFieldFocused = () =>
  document.activeElement === hashtagField ||
  document.activeElement === commentField;


function onDocumentKeydown(evt) {
  if (evt.key === escapeName && !isTextFieldFocused()) {
    evt.preventDefault();
    hideModal();
  }
}

const onFileInputChange = () => {
  showModal();
};

const onCloseButton = () => {
  hideModal();
};

/*const onFormSubmit = (evt) => {
  onFormsubmit();
};
*/
const normalizeTags = (tagString) => tagString
  .trim()
  .split(' ')
  .filter((tag) => Boolean(tag.length));

const hasValidTags = (value) => normalizeTags(value).every((tag) => VALID_SYMBOLS.test(tag));

const hasValidCount = (value) => normalizeTags(value).length <= MAX_HASHTAG_COUNT;

const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

pristine.addValidator(
  hashtagField,
  hasValidCount,
  errorText.INVALID_COUNT,
  thirthOrder,
  true
);

pristine.addValidator(
  hashtagField,
  hasUniqueTags,
  errorText.NOT_UNIQUE,
  secondOrder,
  true
);

pristine.addValidator(
  hashtagField,
  hasValidTags,
  errorText.INVALID_PATTERN,
  firstOrder,
  true
);

const handlerLaunch = () => {
  fileField.addEventListener('change', onFileInputChange);
  closeButton.addEventListener('click', onCloseButton);
  form.addEventListener('submit', onFormSubmit);
};

export { handlerLaunch };


