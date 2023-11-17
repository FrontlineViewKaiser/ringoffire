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
  doc,
  deleteDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, OnDestroy {
  pickCardAnimation = false;
  currentCard = '';
  currentGame: string;
  game = new Game(this.firestore);
  coll;
  doc;
  unsubGame;

  constructor(public dialog: MatDialog, private firestore: Firestore) {}

  ngOnInit() {
    this.initializeData();
  }

  ngOnDestroy(): void {
    this.unsubGame();
    this.deleteGameInstance();
  }

  async initializeData() {
    await this.game.newGame(this.firestore);
    this.defineRef();
    this.updateGame()
    console.log(this.game);
  }

  async defineRef() {
    this.currentGame = this.game.id;
    this.coll = collection(this.firestore, 'games');
    this.doc = doc(this.coll, this.currentGame);
  }

  async deleteGameInstance() {
    await deleteDoc(doc(this.coll, this.currentGame));
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
        this.updateDoc();
      }, 1200);
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe((name) => {
      if (name.length > 0) {
        this.game.players.push(name);
        this.updateDoc();
      }
    });
  }

  async updateDoc() {
    await updateDoc(this.doc, {
      players: this.game.players,
      stack: this.game.stack,
      playedCards: this.game.playedCards,
      currentPlayer: this.game.currentPlayer,
    });
  }

  async updateGame() {
    this.unsubGame = onSnapshot(this.doc, (doc) => {
      console.log(doc.data())
      this.game.players = doc.data().players;
      this.game.stack = doc.data().stack;
      this.game.playedCards = doc.data().playedCards;
      this.game.currentPlayer = doc.data().playedCards;
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
