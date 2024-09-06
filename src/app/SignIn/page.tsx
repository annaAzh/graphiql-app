import { UserForm } from 'features/AuthenticationUser';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Path } from 'shared/types/path';

const SignInPage = () => {
  const cookie = cookies();
  const user = cookie.get('user');

  if (user) redirect(Path.MAIN);

  return <UserForm isLogin={true} />;
};

export default SignInPage;
