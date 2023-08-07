import { Alert, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Badge, Button, HStack, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Switch, Textarea, chakra } from "@chakra-ui/react"
import { FC, useRef, useState } from "react"
import { RichEditor } from ".."
import { RichEditorProps } from "../RichEditor"

interface PreviewRichEditorProps extends RichEditorProps {
  textareaValue: string
  onChangeTextareaValue: (value: string) => void
  onResetTextareaValue: () => void
  onResetRichEditor: () => void
  defaultEnablePreview?: boolean
}
const PreviewRichEditor: FC<PreviewRichEditorProps> = ({
  textareaValue,
  onChangeTextareaValue,
  onResetTextareaValue,
  onResetRichEditor,
  defaultEnablePreview = false,
  ...editorProps
}) => {
  const [isEnableRich, setIsEnableRich] = useState(defaultEnablePreview)

  const [confirmDialogType, setConfirmDialogType] = useState<"enable" | "disable" | null>(null)
  const enableButtonRef = useRef<HTMLButtonElement>(null)
  const disableButtonRef = useRef<HTMLButtonElement>(null)
  const handleConfirmEnable = () => { setConfirmDialogType("enable") }
  const handleEnable = () => {
    onResetRichEditor()
    setIsEnableRich(true)
    setConfirmDialogType(null)
  }
  const handleConfirmDisable = () => { setConfirmDialogType("disable") }
  const handleDisable = () => {
    onResetTextareaValue()
    setIsEnableRich(false)
    setConfirmDialogType(null)
  }
  const handleCancelHandleConfirm = () => { setConfirmDialogType(null) }
  return (
    <chakra.div w="full" >

      <HStack w="full" direction="row" justifyContent="flex-end" py={1}>
        <Popover trigger="hover">
          <PopoverTrigger>
            <div>
              <Badge>プレビュー</Badge>
              リッチエディタ
              <Switch
                isChecked={isEnableRich}
                onChange={e => {
                  e.preventDefault()
                  if (e.target.checked) {
                    handleConfirmEnable()
                  } else {
                    handleConfirmDisable()
                  }
                }}
              />
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>
              <Badge>プレビュー</Badge>
              リッチエディタ
            </PopoverHeader>
            <PopoverBody>
              リッチエディタ機能は
              文字を装飾できる機能です。
              文章にリンクを入れたり太文字にしたりできます。
              (実験的にリリースされた機能です)
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </HStack>

      {isEnableRich
        ? <RichEditor
          {...editorProps}
          placeholder="⭐️ リッチエディタはプレビュー機能です。リンクを入れたり、太文字にしたりできます。"
        />
        : <Textarea
          value={textareaValue}
          onChange={(e) => onChangeTextareaValue(e.currentTarget.value)}
        />
      }

      <AlertDialog
        isOpen={confirmDialogType === "enable"}
        leastDestructiveRef={enableButtonRef}
        onClose={handleCancelHandleConfirm}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>
              リッチエディタを有効にしますか？
            </AlertDialogHeader>
            <AlertDialogBody>
              リッチエディタは現在プレビュー機能です。
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={handleCancelHandleConfirm}>
                キャンセル
              </Button>
              <Button colorScheme="purple" onClick={handleEnable} ref={enableButtonRef}>
                有効にする
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <AlertDialog
        isOpen={confirmDialogType === "disable"}
        leastDestructiveRef={disableButtonRef}
        onClose={handleCancelHandleConfirm}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>
              リッチエディタを無効にしますか？
            </AlertDialogHeader>
            <AlertDialogBody>
              <Alert status='warning'>
                無効にすると一部のデータが失われる可能性があります。
              </Alert>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={handleCancelHandleConfirm}>
                キャンセル
              </Button>
              <Button colorScheme="purple" onClick={handleDisable} ref={disableButtonRef}>
                無効にする
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

    </chakra.div>
  )
}

export default PreviewRichEditor
