import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Lock, User, Eye, EyeOff, AlertTriangle, Check, X, Sparkles } from 'lucide-react';
import { SupportedLanguage } from '../types';

interface AdminLoginModalProps {
  currentLang: SupportedLanguage;
  onClose: () => void;
  onSuccess: () => void;
}

const LOGIN_TRANSLATIONS: Record<SupportedLanguage, {
  title: string;
  subtitle: string;
  userLabel: string;
  passLabel: string;
  btnLabel: string;
  checking: string;
  errorMsg: string;
  demoHint: string;
  successMsg: string;
}> = {
  en: {
    title: 'Admin Verification Required',
    subtitle: 'Access is restricted to authorized agent personnel. Secure login required.',
    userLabel: 'Username',
    passLabel: 'Access Passcode',
    btnLabel: 'Authenticate Portal',
    checking: 'Verifying Security Token...',
    errorMsg: 'Invalid administrative credentials. Please verify your token.',
    demoHint: 'Demo Credentials:',
    successMsg: 'Portal unlocked. Welcome back, Chief Administrator!'
  },
  zh: {
    title: '需要管理员验证',
    subtitle: '访问仅限于授权的代理人。需要安全登录。',
    userLabel: '用户名',
    passLabel: '访问密码',
    btnLabel: '验证门户',
    checking: '正在验证安全代码...',
    errorMsg: '无效的管理员凭据。请验证。',
    demoHint: '演示凭据：',
    successMsg: '门户已解锁。欢迎回来，首席管理员！'
  },
  ru: {
    title: 'Требуется проверка администратора',
    subtitle: 'Доступ ограничен уполномоченным персоналом. Требуется безопасный вход.',
    userLabel: 'Имя пользователя',
    passLabel: 'Пароль доступа',
    btnLabel: 'Аутентифицировать портал',
    checking: 'Проверка токена безопасности...',
    errorMsg: 'Неверные административные учетные данные.',
    demoHint: 'Демо Учетные данные:',
    successMsg: 'Портал разблокирован. Добро пожаловать, Главный Администратор!'
  },
  fr: {
    title: 'Authentification Requise',
    subtitle: 'L\'accès est réservé au personnel autorisé. Connexion sécurisée requise.',
    userLabel: 'Nom d\'utilisateur',
    passLabel: 'Code d\'accès',
    btnLabel: 'S\'authentifier',
    checking: 'Vérification du jeton de sécurité...',
    errorMsg: 'Identifiants administratifs invalides.',
    demoHint: 'Identifiants de démonstration :',
    successMsg: 'Portail déverrouillé. Bon retour, Administrateur en Chef !'
  },
  ar: {
    title: 'مطلوب التحقق من المسؤول',
    subtitle: 'الوصول يقتصر على الموظفين المعتمدين. يتطلب تسجيل دخول آمن.',
    userLabel: 'اسم المستخدم',
    passLabel: 'رمز المرور',
    btnLabel: 'المصادقة والمتابعة',
    checking: 'التحقق من رمز الأمان الفيدرالي...',
    errorMsg: 'بيانات غير صالحة. يرجى مراجعة رمز الأمان الخاص بك.',
    demoHint: 'بيانات الاعتماد التجريبية:',
    successMsg: 'تم فتح البوابة بالكامل. مرحبًا بك مجددًا!'
  },
  es: {
    title: 'Verificación Administrativa',
    subtitle: 'El acceso está restringido a agentes autorizados. Requiere inicio de sesión seguro.',
    userLabel: 'Usuario',
    passLabel: 'Código de Acceso',
    btnLabel: 'Autenticar Portal',
    checking: 'Verificando firma de seguridad...',
    errorMsg: 'Credenciales administrativas inválidas.',
    demoHint: 'Credenciales Demo:',
    successMsg: 'Portal desbloqueado. ¡Bienvenido de nuevo, Administrador!'
  }
};

export default function AdminLoginModal({ currentLang, onClose, onSuccess }: AdminLoginModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const dict = LOGIN_TRANSLATIONS[currentLang] || LOGIN_TRANSLATIONS.en;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    // Simulate elite administrative latency
    setTimeout(() => {
      if (username.trim().toLowerCase() === 'admin' && password === 'admin') {
        setSuccess(true);
        setLoading(false);
        // Delightful delay to let the user enjoy the success visual
        setTimeout(() => {
          onSuccess();
        }, 1200);
      } else {
        setError(true);
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4 sm:p-6"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full bg-lime-500/5 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ scale: 0.95, y: 15 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 180 }}
        className="relative w-full max-w-md backdrop-blur-2xl bg-[#090613]/90 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden"
      >
        {/* Glow corner line */}
        <div className="absolute top-0 left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-lime-400 to-transparent opacity-90" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-300"
          id="close-login-btn"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Main Header */}
        <div className="text-center mb-6">
          <div className="mx-auto w-12 h-12 rounded-full bg-lime-400/10 border border-lime-400/20 flex items-center justify-center mb-4">
            {success ? (
              <Check className="w-6 h-6 text-lime-400 animate-bounce" />
            ) : (
              <Shield className="w-6 h-6 text-lime-400 animate-pulse" />
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-sans font-extrabold tracking-tight text-white flex items-center justify-center gap-2">
            {dict.title}
          </h2>
          <p className="mt-2 text-xs text-gray-400 max-w-xs mx-auto leading-relaxed">
            {dict.subtitle}
          </p>
        </div>

        {/* Error Shake effect container */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: [0, -10, 10, -10, 10, 0], opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-5 p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200 text-xs flex gap-2.5 items-center font-medium"
              id="login-error-alert"
            >
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{dict.errorMsg}</span>
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-5 p-3 rounded-xl bg-lime-950/40 border border-lime-500/30 text-lime-200 text-xs h-10 flex gap-2.5 items-center justify-center font-bold"
              id="login-success-alert"
            >
              <Sparkles className="w-4 h-4 text-lime-400 animate-spin" />
              <span>{dict.successMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-2xs font-bold uppercase tracking-widest text-lime-400 mb-1.5 px-1">
              {dict.userLabel}
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500">
                <User className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading || success}
                placeholder="e.g. admin"
                id="login-username-input"
                className="w-full bg-[#141021]/60 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-hidden focus:border-lime-400 focus:ring-1 focus:ring-lime-400/20 transition-all font-medium placeholder-gray-600 disabled:opacity-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-2xs font-bold uppercase tracking-widest text-lime-400 mb-1.5 px-1">
              {dict.passLabel}
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading || success}
                placeholder="••••••••"
                id="login-password-input"
                className="w-full bg-[#141021]/60 border border-white/10 rounded-xl py-3 pl-10 pr-10 text-sm text-white focus:outline-hidden focus:border-lime-400 focus:ring-1 focus:ring-lime-400/20 transition-all font-medium placeholder-gray-600 disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors p-1"
                id="toggle-pass-visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Authentic Demo Credentials Box */}
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 text-2xs space-y-1">
            <div className="text-gray-400 font-semibold">{dict.demoHint}</div>
            <div className="flex justify-between items-center text-gray-300 font-mono">
              <span className="flex gap-1.5 items-center">
                <span>{dict.userLabel}:</span>
                <span className="bg-white/10 text-white px-1.5 py-0.5 rounded font-extrabold text-3xs">admin</span>
              </span>
              <span className="flex gap-1.5 items-center">
                <span>Pass:</span>
                <span className="bg-white/10 text-white px-1.5 py-0.5 rounded font-extrabold text-3xs">admin</span>
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || success || !username || !password}
            className="w-full mt-2 bg-gradient-to-r from-lime-400 to-green-500 text-black py-3.5 rounded-xl font-sans font-bold text-xs tracking-wider uppercase transition-all duration-300 outline-hidden hover:scale-102 hover:shadow-[0_0_20px_rgba(163,230,53,0.3)] disabled:opacity-40 disabled:scale-100 disabled:shadow-none"
            id="login-submit-btn"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                {dict.checking}
              </span>
            ) : (
              dict.btnLabel
            )}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
