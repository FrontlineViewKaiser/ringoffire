import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss'],
})
export class GameInfoComponent implements OnInit, OnChanges {
  card_actions = [
    {
      title: 'Ace',
      rule: "Waterfall - Everyone starts drinking, and you can't stop until the person to your right has stopped.",
    },
    { title: '2', rule: 'You - Choose someone to drink.' },
    { title: '3', rule: 'Me - The person who drew the card drinks.' },
    {
      title: '4',
      rule: 'Floor - Everyone races to touch the floor, last person to do so drinks.',
    },
    { title: '5', rule: 'Guys - All men drink.' },
    { title: '6', rule: 'Chicks - All women drink.' },
    {
      title: '7',
      rule: 'Heaven - Everyone points upwards, last person to do so drinks.',
    },
    {
      title: '8',
      rule: 'Mate - Pick a mate, they drink whenever you drink for the rest of the game.',
    },
    {
      title: '9',
      rule: 'Rhyme - Say a phrase, everyone else must say phrases that rhyme.',
    },
    {
      title: '10',
      rule: 'Categories - Pick a category, everyone else must name something that fits.',
    },
    {
      title: 'Jack',
      rule: "Never Have I Ever - Play a round of 'Never Have I Ever'.",
    },
    {
      title: 'Queen',
      rule: 'Questions - Start a string of questions, the first person to not respond with a question drinks.',
    },
    {
      title: 'King',
      rule: 'Pour some of your drink into the central cup. The person who draws the fourth King must drink the contents of the central cup.',
    },
  ];

  title = '';
  rule = '';
  @Input() card: string;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.card) {
      let cardNumber = +this.card.split('_')[1];
      this.title = this.card_actions[cardNumber - 1].title;
      this.rule = this.card_actions[cardNumber - 1].rule;
    }
  }
}
