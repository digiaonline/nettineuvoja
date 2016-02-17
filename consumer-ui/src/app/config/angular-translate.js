angular.module('nnConsumerUi')
  .config(function($translateProvider) {
    $translateProvider.translations('fi', {
      'REQUIRED_FIELD': 'Pakollinen kenttä',
      'CHARACTERS_LEFT': 'Merkkiä jäljellä',
      'CHOOSE_FILE': 'Valitse tiedosto',
      'EMPTY_TEXT': 'Valitse',
      'PRINT_BUTTON': 'Tulosta valitus',
      'SEND_MAIL_BUTTON': 'Lähetä sähköpostiin',
      'MAIL_SENT_TEXT': 'Sähköposti lähetetty',
      'NEXT_TEXT': 'Seuraava',
      'SUMMARY_HEADING': 'Reklamaatio',
      'SUMMARY_FOOT_TEXT': 'Odotan yrityksenne vastausta kahden viikon kuluessa. Sen jälkeen minulla on mahdollisuus ottaa yhteyttä maistraattien kuluttajaneuvontaan.'
    });

    $translateProvider.translations('sv', {
      'REQUIRED_FIELD': 'Obligatoriskt fält',
      'CHARACTERS_LEFT': 'Tecken kvar',
      'CHOOSE_FILE': 'Välj fil',
      'EMPTY_TEXT': 'Välj',
      'PRINT_BUTTON': 'Skriv ut reklamation',
      'SEND_MAIL_BUTTON': 'Skicka till e-post',
      'MAIL_SENT_TEXT': 'E-post skickad',
      'NEXT_TEXT': 'Nästa',
      'SUMMARY_HEADING': 'Reklamation',
      'SUMMARY_FOOT_TEXT': 'Jag förväntar mig svar från ert företag inom två veckor. Efter det kan jag kontakta maistratens konsumentrådgivning.'
    });

    $translateProvider.translations('en', {
      'REQUIRED_FIELD': 'Required field',
      'CHARACTERS_LEFT': 'Characters left',
      'CHOOSE_FILE': 'Choose file',
      'EMPTY_TEXT': 'Select',
      'PRINT_BUTTON': 'Print complaint',
      'SEND_MAIL_BUTTON': 'Send to e-mail',
      'MAIL_SENT_TEXT': 'E-mail sent',
      'NEXT_TEXT': 'Next',
      'SUMMARY_HEADING': 'Complaint',
      'SUMMARY_FOOT_TEXT': 'I await an answer from your company within two weeks. Thereafter I may choose to contact the registry office\'s consumer advice.'
    });

    $translateProvider.preferredLanguage('fi');
    $translateProvider.useSanitizeValueStrategy(null);
  });
