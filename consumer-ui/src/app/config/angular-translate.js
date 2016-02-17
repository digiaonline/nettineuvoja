angular.module('nnConsumerUi')
  .config(function($translateProvider) {
    $translateProvider.translations('fi', {
      'REQUIRED_FIELD': 'Pakollinen kenttä',
      'CHARACTERS_LEFT': 'Merkkiä jäljellä',
      'CHOOSE_FILE': 'Valitse tiedosto',
      'PRINT_BUTTON': 'Tulosta',
      'SEND_MAIL_BUTTON': 'Lähetä sähköpostiin',
      'MAIL_SENT_TEXT': 'Sähköposti lähetetty',
      'NEXT_TEXT': 'Seuraava'
    });

    $translateProvider.translations('sv', {
      'REQUIRED_FIELD': 'Obligatoriskt fält',
      'CHARACTERS_LEFT': 'Tecken kvar',
      'CHOOSE_FILE': 'Välj fil',
      'PRINT_BUTTON': 'Skriv ut',
      'SEND_MAIL_BUTTON': 'Skicka till e-post',
      'MAIL_SENT_TEXT': 'E-post skickad',
      'NEXT_TEXT': 'Nästa'
    });

    $translateProvider.translations('en', {
      'REQUIRED_FIELD': 'Required field',
      'CHARACTERS_LEFT': 'Characters left',
      'CHOOSE_FILE': 'Choose file',
      'PRINT_BUTTON': 'Print',
      'SEND_MAIL_BUTTON': 'Send to e-mail',
      'MAIL_SENT_TEXT': 'E-mail sent',
      'NEXT_TEXT': 'Next'
    });

    $translateProvider.preferredLanguage('fi');
    $translateProvider.useSanitizeValueStrategy(null);
  });
