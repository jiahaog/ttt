import TicTacToe from './board/tictactoe';
import PerfectPlayer from './players/perfectPlayer';
import PerfectPlayerWeb from './players/perfectPlayerWeb';
import Player from './players/player';

const api = {
    players: {
        PerfectPlayer: PerfectPlayer,
        PerfectPlayerWeb: PerfectPlayerWeb,
        Player: Player
    },
    TicTacToe: TicTacToe
};

export default api;
