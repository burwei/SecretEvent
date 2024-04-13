import QRCode from "react-qr-code";

const QrCode = () => {
    return (
        <div style={{ height: "auto", margin: "0 auto", maxWidth: 256, width: "100%" }}>
            <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={"hello world!!"}
                viewBox={`0 0 256 256`}
            />
        </div>
    );
}

export default QrCode;