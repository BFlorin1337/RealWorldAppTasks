class TransactionDetailPage {
    verifyTransactionDetailVisible() {
        cy.contains('[data-test="transaction-detail-header"]', 'Transaction Detail').should('be.visible');
    }

    likeFirstTransaction() {
        cy.get('[data-test^="transaction-like-button-"]').first().click();
    }

    verifyLikeCount(count) {
        cy.get('[data-test^="transaction-like-count-"]').first().should("contain", count);
    }

    commentOnTransaction(comment) {
        cy.get('[data-test^="transaction-comment-input-"]').first().type(comment).type("{enter}");
    }

    verifyCommentVisible() {
        cy.get('[data-test^="transaction-comment"]').should("be.visible");
    }

    verifyTransactionHistoryExists() {
        cy.get('[data-test^="transaction-list"]').should("exist");
    }
}

export default TransactionDetailPage;
