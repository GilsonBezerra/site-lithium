(function () {
  var form = document.getElementById('contactForm');
  if (!form) return;

  var feedback = document.getElementById('formFeedback');
  var button = document.getElementById('sendMessageButton');
  var fields = ['name', 'email', 'phone', 'message'];

  function fieldError(id) {
    var input = document.getElementById(id);
    return input ? input.closest('.lith-form-group').querySelector('.lith-form-error') : null;
  }

  function clearErrors() {
    fields.forEach(function (id) {
      var input = document.getElementById(id);
      var error = fieldError(id);
      if (input) input.classList.remove('lith-input--invalid');
      if (error) error.textContent = '';
    });
  }

  function showFeedback(type, text) {
    feedback.className = 'lith-form-feedback lith-form-feedback--' + type;
    feedback.textContent = text;
  }

  function validate() {
    var valid = true;
    var values = {};

    fields.forEach(function (id) {
      var input = document.getElementById(id);
      var value = input.value.trim();
      values[id] = value;

      if (!value) {
        input.classList.add('lith-input--invalid');
        fieldError(id).textContent = 'Este campo é obrigatório.';
        valid = false;
      }
    });

    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (values.email && !emailRe.test(values.email)) {
      document.getElementById('email').classList.add('lith-input--invalid');
      fieldError('email').textContent = 'Informe um e-mail válido.';
      valid = false;
    }

    return { valid: valid, values: values };
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearErrors();
    showFeedback('', '');

    var result = validate();
    if (!result.valid) {
      showFeedback('error', 'Corrija os campos destacados antes de enviar.');
      return;
    }

    button.disabled = true;
    button.classList.add('lith-btn--loading');

    var payload = Object.assign({}, result.values, {
      website: form.querySelector('[name="website"]').value,
    });

    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(function (res) {
        return res.json().then(function (data) {
          return { ok: res.ok, data: data };
        });
      })
      .then(function (result) {
        if (result.ok && result.data.ok) {
          showFeedback('success', 'Mensagem enviada! Em breve entraremos em contato.');
          form.reset();
        } else {
          showFeedback('error', (result.data && result.data.error) || 'Não foi possível enviar sua mensagem.');
        }
      })
      .catch(function () {
        showFeedback('error', 'Erro de conexão. Tente novamente em instantes.');
      })
      .finally(function () {
        button.disabled = false;
        button.classList.remove('lith-btn--loading');
      });
  });

  document.getElementById('name').addEventListener('focus', function () {
    showFeedback('', '');
  });
})();
