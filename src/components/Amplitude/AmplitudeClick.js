import * as Amplitude from '@amplitude/node';
const client = Amplitude.init('caa10d0556acc367dc07e47338ce56f6');



function AmplitudeClick(clickText, user_id) {
    // const {textLabel} = props;
    console.log("referrer url", document.referrer);
    console.log("event::::::::", clickText);

    // const [ref, setRef] = useState(document.referrer);
    // App Opened
    client.logEvent({
        event_type: "THALASSA - " + clickText,
        user_id: user_id,
        event_properties: {
            keyString: document.referrer,
            keyInt: 11,
            keyBool: true
        }
    });
}

export default AmplitudeClick;