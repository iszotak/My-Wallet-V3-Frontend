
angular
  .module('walletApp')
  .directive('confirmRecoveryPhrase', confirmRecoveryPhrase);

confirmRecoveryPhrase.$inject = ['$uibModal', 'Wallet', 'Alerts'];

function confirmRecoveryPhrase ($uibModal, Wallet, Alerts) {
  const directive = {
    restrict: 'E',
    replace: true,
    scope: {},
    templateUrl: 'templates/confirm-recovery-phrase.jade',
    link: link
  };
  return directive;

  function link (scope, elem, attrs) {
    let openModal = () => $uibModal.open({
      templateUrl: 'partials/confirm-recovery-phrase-modal.jade',
      controller: 'ConfirmRecoveryPhraseCtrl',
      windowClass: 'bc-modal'
    });

    scope.confirmRecoveryPhrase = () => (
      Wallet.settings.secondPassword
        ? openModal()
        : Wallet.askForMainPasswordConfirmation()
          .then(openModal)
          .catch(() => {
            Alerts.displayError('INCORRECT_PASSWORD');
            scope.confirmRecoveryPhrase();
          })
    );
  }
}
