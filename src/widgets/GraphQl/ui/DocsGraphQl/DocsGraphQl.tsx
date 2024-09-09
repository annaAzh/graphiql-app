import { Box, Drawer } from '@mui/material';
import { FC } from 'react';
import { Button } from 'shared/components';
import { DocExplorer, GraphiQLProvider } from '@graphiql/react';
import { createGraphiQLFetcher } from '@graphiql/toolkit';
import CloseIcon from '@mui/icons-material/Close';
import style from './DocsGraphQl.module.scss';
import './docsExplorer.scss';

type Props = {
  sdlUrl: string;
  onClose: () => void;
  onClickShowDocs: () => void;
  shownDocs: boolean;
};

export const DocsGraphQl: FC<Props> = ({
  sdlUrl,
  onClose,
  shownDocs,
  onClickShowDocs,
}) => {
  return (
    <div
      className={
        shownDocs
          ? `${style.docs} ${style.shown} custom-doc-explorer`
          : `${style.docs} custom-doc-explorer`
      }
    >
      {shownDocs && (
        <Drawer open={shownDocs} onClose={onClose}>
          <Box
            className={style.drawer}
            sx={{ width: 360 }}
            p={2}
            role="presentation"
          >
            <Button
              variant="outlined"
              size="lg"
              onClick={onClickShowDocs}
              className={style.close_btn}
            >
              <CloseIcon />
            </Button>
            <GraphiQLProvider fetcher={createGraphiQLFetcher({ url: sdlUrl })}>
              <DocExplorer />
            </GraphiQLProvider>
          </Box>
        </Drawer>
      )}
    </div>
  );
};
