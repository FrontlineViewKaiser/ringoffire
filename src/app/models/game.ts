import { Firestore, addDoc, collection } from '@angular/fire/firestore';

export class Game {
  public players: string[] = [];
  public stack: string[] = [];
  public playedCards: string[] = [''];
  public currentPlayer: number = 0;
  public id: string;

  constructor(private firestore: Firestore) {
    for (let i = 1; i < 14; i++) {
      this.stack.push('ace_' + i);
      this.stack.push('clubs_' + i);
      this.stack.push('diamonds_' + i);
      this.stack.push('hearts_' + i);
    }
    this.shuffleArray(this.stack);
  }


 shuffleArray(array: any[]): any[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

async newGame(firestore) {
  const coll = collection(firestore, 'games');
  await addDoc(coll, {
    players: [],
    stack: this.stack,
    playedCards: this.playedCards,
    currentPlayer: this.currentPlayer
  })
    .catch((err) => {
      console.error(err);
    })
    .then((docRef: any) => {
      this.id = docRef.id;
    });
}
}