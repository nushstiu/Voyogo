import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../constants';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, loading } = useAuth();
  const redirectTo = searchParams.get('redirect');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const doLogin = async (emailValue: string, passwordValue: string) => {
    const user = await login(emailValue, passwordValue);
    if (redirectTo) {
      navigate(`/${redirectTo}`);
    } else {
      navigate(user.role === 'admin' ? ROUTES.ADMIN_DASHBOARD : ROUTES.USER_DASHBOARD);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await doLogin(email, password);
    } catch {
      // handled in AuthContext
    }
  };

  const handleDemoLogin = async (demoEmail: string) => {
    try {
      await doLogin(demoEmail, 'demo123');
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
              'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-black/50" />

          <div className="relative z-10 w-full max-w-md mx-4 mt-20">
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-xl">
              <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
                {t('auth.loginTitle')}
              </h2>
              <p className="text-gray-500 text-center mb-8">
                {t('auth.loginSubtitle')}
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
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
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      className={`p-4 pl-11 rounded bg-gray-100 outline-none w-full ${
                        errors.email ? 'ring-2 ring-red-400' : ''
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
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
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                      }}
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
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-[55px] bg-blue-500 text-white rounded-lg font-semibold text-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                >
                  {loading ? t('auth.loginLoading') : t('auth.loginButton')}
                </button>
              </form>

              {/* Demo Accounts */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-400 mb-3 text-center uppercase tracking-widest font-semibold">
                  {t('auth.demoAccounts')}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleDemoLogin('iulia@example.com')}
                    disabled={loading}
                    className="flex-1 text-sm py-2.5 px-3 border border-gray-200 rounded-lg hover:border-cyan-400 hover:text-cyan-400 transition-colors font-medium disabled:opacity-50"
                  >
                    {t('auth.userLogin')}
                  </button>
                  <button
                    onClick={() => handleDemoLogin('admin@voyogo.com')}
                    disabled={loading}
                    className="flex-1 text-sm py-2.5 px-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:text-blue-500 transition-colors font-medium disabled:opacity-50"
                  >
                    {t('auth.adminLogin')}
                  </button>
                </div>
              </div>

              <p className="text-center text-gray-500 mt-6">
                {t('auth.noAccount')}{' '}
                <Link to={ROUTES.REGISTER} className="text-cyan-400 font-semibold hover:text-cyan-500">
                  {t('auth.signUp')}
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
