import { EditorView } from '@codemirror/view';

const myTheme = EditorView.theme(
  {
    '&': {
      color: 'var(--main-color-1)',
      backgroundColor: 'var(--main-color-4)',
    },
    '& .cm-scroller': {
      scrollbarWidth: 'thin',
      scrollbarColor: `var(--magenta) var(--main-color-4)`,
    },
    '.cm-content': {
      caretColor: 'var(--main-color-4)',
      fontSize: '16px',
    },
    '&.cm-focused .cm-cursor': {
      borderLeftColor: '#0e9',
    },
    '&.cm-focused .cm-selectionBackground, ::selection': {
      backgroundColor: '#074',
    },
    '.cm-gutters': {
      backgroundColor: 'var(--magenta)',
      color: '#ddd',
      border: 'none',
    },
  },
  { dark: true }
);

export { myTheme };
