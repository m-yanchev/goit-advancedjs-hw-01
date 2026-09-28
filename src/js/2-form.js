const refs = {
  feedbackForm: document.querySelector('.feedback-form'),
};

let formData = {
  email: '',
  message: '',
};

const fillFeedbackFormFields = () => {
  const formDataFromLS = JSON.parse(localStorage.getItem('feedback-form-state'));

  if (formDataFromLS === null) {
    return;
  }

  formData = formDataFromLS;

  const formDataFormFromLSKeys = Object.keys(formDataFromLS);
  formDataFormFromLSKeys.forEach(key => {
    refs.feedbackForm.elements[key].value = formDataFromLS[key];
  });
};

fillFeedbackFormFields();

const onFeedbackFormFieldInput = ({ target: formFieldEl }) => {
  const formFieldName = formFieldEl.name;
  const formFieldValue = formFieldEl.value.trim();
  formData[formFieldName] = formFieldValue;
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
};

const onFeedbackFormSubmit = event => {
  event.preventDefault();

  const formDataValues = Object.values(formData);

  if (formDataValues.includes('')) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  localStorage.removeItem('feedback-form-state');
  refs.feedbackForm.reset();
  const formDataKeys = Object.keys(formData);
  formDataKeys.forEach(key => {
    formData[key] = '';
  });
};

refs.feedbackForm.addEventListener('input', onFeedbackFormFieldInput);
refs.feedbackForm.addEventListener('submit', onFeedbackFormSubmit);
