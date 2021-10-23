import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useEffect, useCallback } from 'react';

const YourReCaptchaComponent = () => {
    const { executeRecaptcha } = useGoogleReCaptcha();

    // Create an event handler so you can call the verification on button click event or form submit
    const handleReCaptchaVerify = useCallback(async () => {
        if (!executeRecaptcha) {
            console.log('Execute recaptcha not yet available');
        }
        const token = await executeRecaptcha('yourAction');
        // Do whatever you want with the token
    }, []);

    // You can use useEffect to trigger the verification as soon as the component being loaded
    useEffect(() => {
        handleReCaptchaVerify();
    }, [handleReCaptchaVerify]);

    return <button>Verify recaptcha</button>;
    // return <button onClick={handleRecaptchaVerify}>Verify recaptcha</button>;
};
export default YourReCaptchaComponent;

//     <GoogleReCaptchaProvider reCaptchaKey="[6LdntrkcAAAAANcrf0S1d_dkFRj8w7DvFcItvJWs]">
//         <YourReCaptchaComponent />
//     </GoogleReCaptchaProvider>,

// );
