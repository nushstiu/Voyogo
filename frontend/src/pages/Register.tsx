import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../constants';
import Header from '../components/layout/Header';

export default function Register() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register: authRegister, loading } = useAuth();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!username.trim()) {
      newErrors.username = t('validation.required');
    } else if (username.length < 5) {
      newErrors.username = t('validation.usernameMin');
    } else if (username.length > 15) {
      newErrors.username = t('validation.usernameMax');
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      newErrors.username = t('validation.usernameFormat');
    }
    if (!email.trim()) {
      newErrors.email = t('validation.required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = t('validation.invalidEmail');
    }
    if (!password) {
      newErrors.password = t('validation.required');
    } else if (password.length < 6) {
      newErrors.password = t('validation.passwordMin');
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = t('validation.required');
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = t('validation.passwordsMismatch');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await authRegister(username, email, password);
      navigate(ROUTES.USER_DASHBOARD);
    } catch {
      // handled in AuthContext
    }
  };

  return (
    <>
      <Header transparent />
      <main>
        <section
          className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-black/50" />

          <div className="relative z-10 w-full max-w-md mx-4 mt-20 mb-10">
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-xl">
              <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
                {t('auth.registerTitle')}
              </h2>
              <p className="text-gray-500 text-center mb-8">
                {t('auth.registerSubtitle')}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
                    {t('form.username')} <span className="text-blue-500">*</span>
                  </label>
                  <div className="relative">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="text"
                      placeholder={t('form.username')}
                      value={username}
                      onChange={(e) => { setUsername(e.target.value); clearError('username'); }}
                      className={`p-4 pl-11 rounded bg-gray-100 outline-none w-full ${
                        errors.username ? 'ring-2 ring-red-400' : ''
                      }`}
                    />
                  </div>
                  {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
                    {t('form.email')} <span className="text-blue-500">*</span>
                  </label>
                  <div className="relative">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); clearError('email'); }}
                      className={`p-4 pl-11 rounded bg-gray-100 outline-none w-full ${
                        errors.email ? 'ring-2 ring-red-400' : ''
                      }`}
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
                    {t('form.password')} <span className="text-blue-500">*</span>
                  </label>
                  <div className="relative">
                    <FontAwesomeIcon
                      icon={faLock}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder={t('form.password')}
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); clearError('password'); }}
                      className={`p-4 pl-11 pr-11 rounded bg-gray-100 outline-none w-full ${
                        errors.password ? 'ring-2 ring-red-400' : ''
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
                    {t('form.confirmPassword')} <span className="text-blue-500">*</span>
                  </label>
                  <div className="relative">
                    <FontAwesomeIcon
                      icon={faLock}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder={t('form.confirmPassword')}
                      value={confirmPassword}
                      onChange={(e) => { setConfirmPassword(e.target.value); clearError('confirmPassword'); }}
                      className={`p-4 pl-11 pr-11 rounded bg-gray-100 outline-none w-full ${
                        errors.confirmPassword ? 'ring-2 ring-red-400' : ''
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-[55px] bg-blue-500 text-white rounded-lg font-semibold text-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                >
                  {loading ? t('auth.registerLoading') : t('auth.registerButton')}
                </button>
              </form>

              <p className="text-center text-gray-500 mt-6">
                {t('auth.hasAccount')}{' '}
                <Link to={ROUTES.LOGIN} className="text-cyan-400 font-semibold hover:text-cyan-500">
                  {t('auth.signIn')}
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
