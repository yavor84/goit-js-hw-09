const feedbackForm = document.querySelector('.feedback-form');
let formData = {
  email: '',
  message: '',
};

const fillFormFields = () => {
  try {
    const formDataLocalStorage = JSON.parse(
      localStorage.getItem('feedback-form-state')
    );
    if (formDataLocalStorage === null) {
      return;
    }
    formData = formDataLocalStorage;
    for (const key in formDataLocalStorage) {
      feedbackForm.elements[key].value = formDataLocalStorage[key];
    }
  } catch (error) {
    console.log(error);
  }
};

fillFormFields();

const onFormInput = event => {
  const { target: formFieldElement } = event;
  const formFieldValue = formFieldElement.value;
  const formFieldName = formFieldElement.name;
  formData[formFieldName] = formFieldValue.trim();
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
};

const onFormSubmit = event => {
  event.preventDefault();
  if (formData.email === '' || formData.message === '') {
    return alert('Fill please all fields');
  }
  console.log(formData);
  feedbackForm.reset();
  localStorage.removeItem('feedback-form-state');
  formData.email = '';
  formData.message = '';
};

feedbackForm.addEventListener('input', onFormInput);
feedbackForm.addEventListener('submit', onFormSubmit);
