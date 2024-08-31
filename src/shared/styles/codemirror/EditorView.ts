import { EditorView } from '@codemirror/view';
import { Path } from 'shared/types/path';

const myTheme = (redactor: string = `${Path.REST}`) => {
  const color =
    redactor === `${Path.GRAPH}` ? 'var(--magenta)' : 'var(--denim)';

  return EditorView.theme(
    {
      '&': {
        color: 'var(--main-color-1)',
        backgroundColor: 'var(--main-color-4)',
      },
      '& .cm-scroller': {
        scrollbarWidth: 'thin',
        scrollbarColor: `${color} var(--main-color-4)`,
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
        backgroundColor: color,
        color: '#ddd',
        border: 'none',
      },
    },
    { dark: true }
  );
};

export { myTheme };
