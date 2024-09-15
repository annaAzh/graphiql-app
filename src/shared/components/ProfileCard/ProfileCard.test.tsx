import { render } from "@testing-library/react";
import { ProfileCard } from "./ProfileCard";
import Log from '../../assets/img/logo.jpg'

describe('testing Profile Card', () => {
  it('should be a profile card', async () => {
    const { getByRole } = render(<ProfileCard name={'Jon'} src ={Log}/>);

    const imgDev = getByRole('img');

    expect(imgDev).toBeInTheDocument();

  });

})