import { Alert, AlertIcon, Button, Collapse, Container, Spinner, VStack } from "@chakra-ui/react"
import NextLink from "next/link"
import { FC } from "react"
import { Championship } from "~/shared/firebase/firestore/scheme/championship"
import { ChampionshipEyecatch } from "../Eyecatch"

interface SubmitStepContentProps {
  isSubmitting: boolean
  isSubmitted: boolean
  onSubmit: () => void
  onPrev: () => void
  nextLink: string | null
  eyecatchPreview: Pick<Championship,
    | "name"
    | "image"
    | "color"
    | "hold_at"
    | "host_name"
  >
}
export const SubmitStepContent: FC<SubmitStepContentProps> = ({
  isSubmitting,
  isSubmitted,
  onSubmit,
  onPrev,
  nextLink,
  eyecatchPreview,
}) => {
  return (
    <VStack spacing="4" w="full">
      <Alert status="info">
        <AlertIcon />
        準備ができました！
        大会を登録できます
      </Alert>

      <Container>
        <ChampionshipEyecatch
          name={eyecatchPreview.name}
          image={eyecatchPreview.image}
          color={eyecatchPreview.color}
          holdAt={eyecatchPreview.hold_at}
          hostName={eyecatchPreview.host_name}
          isLoading={false}
        />
      </Container>

      <Button
        size="lg"
        onClick={onSubmit}
        colorScheme="purple"
        isDisabled={isSubmitting || isSubmitted}
        leftIcon={isSubmitting ? <Spinner /> : undefined}
      >
        登録する
      </Button>
      <Collapse in={isSubmitted}>
        {/* TODO championship eyecatch */}
        <Button
          size="lg"
          colorScheme="purple"
          as={NextLink}
          href={nextLink ?? "/championships"}
        >
          大会のページへ
        </Button>
      </Collapse>
      <VStack>
        <Button onClick={onPrev} isDisabled={isSubmitting || isSubmitted}>
          戻る
        </Button>
      </VStack>
    </VStack >
  )
}
