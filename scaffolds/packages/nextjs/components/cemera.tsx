import { Scanner } from '@yudiel/react-qr-scanner';

const Camera = () => {
    return (
        <Scanner
            onResult={(text: string, _) => console.log(text)}
            onError={(error) => console.log(error?.message)}
        />
    );
}

export default Camera;
