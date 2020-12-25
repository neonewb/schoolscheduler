import { useEffect, useRef } from 'react'

export const useDocumentTitle = (title: string) => {
  const defaultTitle = useRef(document.title)

  useEffect(() => {
    document.title = title
    return () => {
      document.title = defaultTitle.current
    }
  }, [title])
}
