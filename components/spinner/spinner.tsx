import ScaleLoader from 'react-spinners/ScaleLoader';
import { css } from '@emotion/react';


const override = css`
  display: block;
  margin: 0 auto;
`;


export default function Spinner(): JSX.Element {
  return (
    <main className="page-content">

      <div style={{
        textAlign: 'center',
        fontSize: '1.8em',
        fontWeight: '700',
        paddingTop: '11%',
        paddingBottom: '11%',
      }}
      >
        <div style={{paddingBottom: '100px'}}>Loading ...</div>
        <ScaleLoader color='black' loading css={override} height={150} width={10} radius={10} margin={10} />
      </div>
    </main>
  );
}
