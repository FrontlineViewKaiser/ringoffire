import { Component, OnDestroy, OnInit } from '@angular/core';
import { Game } from '../models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import {
  Firestore,
  collection,
  collectionData,
  onSnapshot,
  addDoc,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, OnDestroy {
  pickCardAnimation = false;
  currentCard = '';
  game!: Game;
  coll;
  unsubGame;

  constructor(public dialog: MatDialog, private firestore: Firestore) {}

  ngOnInit() {
    this.coll = collection(this.firestore, 'games');
    this.unsubGame = onSnapshot(this.coll, (games) => {
      games.forEach((game) => {
        console.log(game.data());
      });
    });
    this.newGame();
  }

  ngOnDestroy(): void {
    this.unsubGame();
  }

  async newGame() {
    this.game = new Game();
    await addDoc(this.coll, 'game')
      .catch((err) => {
        console.error(err);
      })
      .then((docRef) => {
        console.log('New Doc created with ID:', docRef);
      });
    console.log(this.game);
  }

  drawCard() {
    if (this.game.stack.length > 0 && !this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop()!;
      this.pickCardAnimation = true;

      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
        this.game.currentPlayer =
          (this.game.currentPlayer + 1) % this.game.players.length;
      }, 1200);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent);
    console.log(this.game);

    dialogRef.afterClosed().subscribe((name) => {
      if (name > 0) {
        this.game.players.push(name);
      }
    });
  }
}

/*
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
*/
