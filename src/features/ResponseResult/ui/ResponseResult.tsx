import { FC } from 'react';
import style from './ResponseResult.module.scss';
import { RestResponse } from 'shared/types/restful';

interface ResponseResultProps {
  data: RestResponse;
}
export const ResponseResult: FC<ResponseResultProps> = ({ data }) => {
  const { status, body } = data;
  return (
    <div className={style.result}>
      <p>status: {status}</p>
      <br />
      <pre>
        <code>{body}</code>
      </pre>
    </div>
  );
};
