import { Stack } from '@chakra-ui/react'
import { Card, Deck } from '~/firebase'
import { DeckItem } from './Item'

type Props = {
  cards: Card[]
  decks: Deck[]
}

export const DeckList = ({ cards, decks }: Props) => {
  return (
    <Stack gap={6}>
      {decks.map((deck) => (
        <DeckItem key={deck.id} deck={deck} cards={cards} />
      ))}
    </Stack>
  )
}
