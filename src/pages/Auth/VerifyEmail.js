import React, { useState, useRef, useEffect } from 'react';
import { Typography, Button, notification, Spin } from 'antd';
import { CheckCircleOutlined, MailOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './VerifyEmail.css';

const { Title, Text } = Typography;

const VerifyEmail = () => {
    const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
    const [errors, setErrors] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const inputRefs = useRef([]);
    const navigate = useNavigate();

    // Focus vào ô input đầu tiên khi component được mount
    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleChange = (index, value) => {
        // Chỉ cho phép nhập số
        if (!/^\d*$/.test(value)) return;

        const newVerificationCode = [...verificationCode];
        newVerificationCode[index] = value;
        setVerificationCode(newVerificationCode);

        // Xóa thông báo lỗi khi người dùng nhập giá trị
        const newErrors = [...errors];
        newErrors[index] = '';
        setErrors(newErrors);

        // Tự động focus vào ô tiếp theo nếu có nhập giá trị
        if (value !== '' && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        // Xử lý phím Backspace
        if (e.key === 'Backspace' && verificationCode[index] === '' && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6).split('');
        const newVerificationCode = [...verificationCode];
        const newErrors = [...errors];

        pastedData.forEach((value, index) => {
            if (index < 6 && /^\d$/.test(value)) {
                newVerificationCode[index] = value;
                newErrors[index] = ''; // Xóa lỗi khi paste thành công
            }
        });

        setVerificationCode(newVerificationCode);
        setErrors(newErrors);

        // Focus vào ô cuối cùng có giá trị
        const lastFilledIndex = newVerificationCode.findLastIndex(value => value !== '');
        if (lastFilledIndex !== -1 && lastFilledIndex < 5) {
            inputRefs.current[lastFilledIndex + 1].focus();
        }
    };

    const validateInputs = () => {
        const newErrors = verificationCode.map((value, index) =>
            value === '' ? 'Vui lòng nhập mã' : ''
        );
        setErrors(newErrors);
        return !newErrors.some(error => error !== '');
    };

    const handleSubmit = () => {
        if (!validateInputs()) {
            notification.error({
                message: 'Thông tin không hợp lệ',
                description: 'Vui lòng nhập đầy đủ mã xác thực 6 số.',
                placement: 'topRight'
            });
            // Focus vào ô trống đầu tiên
            const firstEmptyIndex = verificationCode.findIndex(value => value === '');
            if (firstEmptyIndex !== -1) {
                inputRefs.current[firstEmptyIndex].focus();
            }
            return;
        }

        const code = verificationCode.join('');
        setLoading(true);

        // Giả lập API call
        setTimeout(() => {
            setLoading(false);
            notification.success({
                message: 'Xác thực thành công',
                description: 'Email của bạn đã được xác thực. Vui lòng đăng nhập để tiếp tục.',
                placement: 'topRight'
            });
            navigate('/login');
        }, 1500);
    };

    const handleResendCode = () => {
        notification.info({
            message: 'Đã gửi lại mã',
            description: 'Mã xác thực mới đã được gửi đến email của bạn.',
            placement: 'topRight'
        });
    };

    return (
        <div className="verify-email-page">
            <div className="verify-email-background">
                <div className="verify-email-overlay"></div>
            </div>

            <motion.div
                className="verify-email-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="verify-email-content">
                    <motion.div
                        className="verify-email-icon"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <MailOutlined />
                    </motion.div>

                    <Title level={3}>Xác thực email</Title>
                    <Text type="secondary" className="verify-email-description">
                        Vui lòng nhập mã xác thực 6 số đã được gửi đến email của bạn
                    </Text>

                    <div className="verification-code-container">
                        {verificationCode.map((value, index) => (
                            <div key={index} className="input-wrapper">
                                <input
                                    ref={el => inputRefs.current[index] = el}
                                    type="text"
                                    maxLength={1}
                                    value={value}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={handlePaste}
                                    className={`verification-input ${errors[index] ? 'error' : ''}`}
                                />
                                {errors[index] && (
                                    <div className="error-message">{errors[index]}</div>
                                )}
                            </div>
                        ))}
                    </div>

                    <Button
                        type="primary"
                        size="large"
                        block
                        onClick={handleSubmit}
                        loading={loading}
                        icon={<CheckCircleOutlined />}
                        className="verify-button"
                    >
                        Xác nhận
                    </Button>

                    <div className="resend-code">
                        <Text type="secondary">Không nhận được mã? </Text>
                        <Button type="link" onClick={handleResendCode}>
                            Gửi lại mã
                        </Button>
                    </div>

                    {loading && (
                        <div className="verify-loading-overlay">
                            <Spin tip="Đang xác thực..." size="large" />
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default VerifyEmail; 