import { Fragment } from 'react'
import type { HistoriaRichText } from '@/content/historia'

interface HistoriaInlineTextProps {
  content: HistoriaRichText
}

export default function HistoriaInlineText({ content }: HistoriaInlineTextProps) {
  return content.map((segment, index) => {
    const key = `${index}-${segment.text}`

    if (segment.mark === 'strong') {
      return <strong key={key}>{segment.text}</strong>
    }

    if (segment.mark === 'em') {
      return <em key={key}>{segment.text}</em>
    }

    return <Fragment key={key}>{segment.text}</Fragment>
  })
}
