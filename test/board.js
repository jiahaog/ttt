import Board from './../src/js/game/board/board';


describe('Tic-Tac-Toe Board', () => {

    describe('Marking player moves', () => {
        it('Will fail invalid players', (done) => {
            const board = new Board();
            try {
                board._markPlayerMove(null, [2, 2]);
                done('Invalid player was not caught');
            } catch (e) {
                done();
            }
        });

        it('Will fail coordinates with moves with invalid length', (done) => {
            const board = new Board();
            try {
                board._markPlayerMove(1, [2, 2, 2]);
                done('Invalid coordinates were not caught');
            } catch (e) {
                done();
            }
        });

        it('Will fail coordinates with moves out of the board', (done) => {
            const board = new Board();
            try {
                board._markPlayerMove(1, [-1, 3]);
                done('Invalid coordinates was not caught');
            } catch (e) {
                done();
            }
        });

        it('Can make a valid move', () => {
            const board = new Board();
            board._markPlayerMove(1, [2, 2]);
        })
    });


});
