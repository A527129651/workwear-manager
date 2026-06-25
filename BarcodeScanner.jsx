/**
 * BarcodeScanner.jsx
 * 
 * שימוש:
 *   import BarcodeScanner from './BarcodeScanner';
 *   <BarcodeScanner onScan={(code) => console.log(code)} onClose={() => setShowScanner(false)} />
 * 
 * התקנה:
 *   npm install jsqr
 */

import { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";

export default function BarcodeScanner({ onScan, onClose }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const animRef = useRef(null);
  const lastScanned = useRef("");
  const lastScannedTime = useRef(0);

  const [status, setStatus] = useState("מאתחל מצלמה...");
  const [error, setError] = useState(null);
  const [scannedCount, setScannedCount] = useState(0);
  const [lastCode, setLastCode] = useState(null);
  const [torchOn, setTorchOn] = useState(false);
  const [supportsTorch, setSupportsTorch] = useState(false);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    try {
      // מעדיף מצלמה אחורית (טלפון)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "environment" },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setStatus("מוכן לסריקה");
      }

      // בדיקת תמיכה בפנס
      const track = stream.getVideoTracks()[0];
      const capabilities = track.getCapabilities?.();
      if (capabilities?.torch) setSupportsTorch(true);

      // התחל סריקה
      requestAnimationFrame(scanFrame);
    } catch (err) {
      if (err.name === "NotAllowedError") {
        setError("אין הרשאה למצלמה. אנא אשר גישה בהגדרות הדפדפן.");
      } else if (err.name === "NotFoundError") {
        setError("לא נמצאה מצלמה במכשיר.");
      } else {
        setError("שגיאה בפתיחת המצלמה: " + err.message);
      }
    }
  };

  const stopCamera = () => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
    }
  };

  const scanFrame = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || video.readyState !== video.HAVE_ENOUGH_DATA) {
      animRef.current = requestAnimationFrame(scanFrame);
      return;
    }

    const ctx = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: "dontInvert",
    });

    if (code) {
      const now = Date.now();
      // מניעת סריקה כפולה של אותו ברקוד תוך 2 שניות
      if (code.data !== lastScanned.current || now - lastScannedTime.current > 2000) {
        lastScanned.current = code.data;
        lastScannedTime.current = now;

        setLastCode(code.data);
        setScannedCount((prev) => prev + 1);
        onScan(code.data);

        // רטט (טלפון)
        if (navigator.vibrate) navigator.vibrate(100);
      }
    }

    animRef.current = requestAnimationFrame(scanFrame);
  };

  const toggleTorch = async () => {
    if (!streamRef.current) return;
    const track = streamRef.current.getVideoTracks()[0];
    try {
      await track.applyConstraints({ advanced: [{ torch: !torchOn }] });
      setTorchOn(!torchOn);
    } catch {}
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.92)",
        zIndex: 2000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        direction: "rtl",
      }}
    >
      {/* Header */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          padding: "16px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "rgba(0,0,0,0.6)",
        }}
      >
        <div style={{ color: "white", fontWeight: 700, fontSize: 16 }}>
          סריקת ברקוד
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {supportsTorch && (
            <button
              onClick={toggleTorch}
              style={{
                background: torchOn ? "#FF6B35" : "rgba(255,255,255,0.15)",
                border: "none",
                borderRadius: 8,
                padding: "8px 14px",
                color: "white",
                cursor: "pointer",
                fontSize: 18,
              }}
              title="פנס"
            >
              🔦
            </button>
          )}
          <button
            onClick={() => { stopCamera(); onClose(); }}
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "none",
              borderRadius: 8,
              padding: "8px 16px",
              color: "white",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            סגור ✕
          </button>
        </div>
      </div>

      {/* Camera view */}
      {error ? (
        <div
          style={{
            background: "#FEE2E2",
            color: "#991B1B",
            padding: 24,
            borderRadius: 12,
            maxWidth: 320,
            textAlign: "center",
            fontSize: 14,
            lineHeight: 1.6,
          }}
        >
          <div style={{ fontSize: 32, marginBottom: 12 }}>📷</div>
          {error}
          <br />
          <button
            onClick={() => { setError(null); startCamera(); }}
            style={{
              marginTop: 16,
              padding: "8px 20px",
              background: "#FF6B35",
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            נסה שוב
          </button>
        </div>
      ) : (
        <div style={{ position: "relative", width: "min(480px, 90vw)" }}>
          <video
            ref={videoRef}
            muted
            playsInline
            style={{
              width: "100%",
              borderRadius: 12,
              display: "block",
              background: "#000",
            }}
          />

          {/* Scan overlay – מסגרת מרכזית */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                width: "65%",
                height: "30%",
                position: "relative",
              }}
            >
              {/* פינות */}
              {[
                { top: 0, right: 0, borderTop: "3px solid #FF6B35", borderRight: "3px solid #FF6B35", borderRadius: "0 8px 0 0" },
                { top: 0, left: 0, borderTop: "3px solid #FF6B35", borderLeft: "3px solid #FF6B35", borderRadius: "8px 0 0 0" },
                { bottom: 0, right: 0, borderBottom: "3px solid #FF6B35", borderRight: "3px solid #FF6B35", borderRadius: "0 0 8px 0" },
                { bottom: 0, left: 0, borderBottom: "3px solid #FF6B35", borderLeft: "3px solid #FF6B35", borderRadius: "0 0 0 8px" },
              ].map((style, i) => (
                <div key={i} style={{ position: "absolute", width: 24, height: 24, ...style }} />
              ))}

              {/* קו סריקה אנימציה */}
              <ScanLine />
            </div>
          </div>

          {/* canvas נסתר לעיבוד */}
          <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>
      )}

      {/* Footer */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "16px 20px",
          background: "rgba(0,0,0,0.6)",
          textAlign: "center",
        }}
      >
        {lastCode ? (
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#D1FAE5",
                color: "#065F46",
                padding: "8px 18px",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 14,
                marginBottom: 6,
                fontFamily: "monospace",
              }}
            >
              ✓ {lastCode}
            </div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>
              נסרקו בסשן זה: {scannedCount} בגדים
            </div>
          </div>
        ) : (
          <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>
            {status} — כוון את הברקוד אל תוך המסגרת
          </div>
        )}
      </div>
    </div>
  );
}

// קו סריקה מונפש
function ScanLine() {
  const [pos, setPos] = useState(0);
  const [dir, setDir] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setPos((prev) => {
        if (prev >= 95) { setDir(-1); return 95; }
        if (prev <= 0) { setDir(1); return 0; }
        return prev + dir * 2;
      });
    }, 16);
    return () => clearInterval(interval);
  }, [dir]);

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: `${pos}%`,
        height: 2,
        background: "linear-gradient(90deg, transparent, #FF6B35, transparent)",
        boxShadow: "0 0 8px #FF6B35",
        transition: "top 0.016s linear",
      }}
    />
  );
}
