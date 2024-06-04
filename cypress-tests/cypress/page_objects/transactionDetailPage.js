class TransactionDetailPage {
    verifyTransactionDetailVisible() {
        return cy.contains('[data-test="transaction-detail-header"]', 'Transaction Detail');
    }
    likeFirstTransaction() {
        cy.get('[data-test^="transaction-like-button-"]').first().click();
    }
    verifyLikeCount() {
        return cy.get('[data-test^="transaction-like-count-"]').first();
    }
    commentOnTransaction(comment) {
        cy.get('[data-test^="transaction-comment-input-"]').first().type(comment).type("{enter}");
    }
    verifyCommentVisible() {
        return cy.get('[data-test^="transaction-comment"]');
    }
    verifyTransactionHistoryExists() {
        return cy.get('[data-test^="transaction-list"]');
    }
}
export default TransactionDetailPage;
