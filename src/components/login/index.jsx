import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          phone: data.phone,
          password: data.password,
        }
      )

      const token = response?.data?.access_token
      if (token) {
        localStorage.setItem('token', token)
        alert('Muvaffaqiyatli kirildi!')
        navigate('/')
      } else {
        alert('Token olinmadi!')
      }
    } catch (error) {
      console.error('Login error:', error)
      alert('Login yoki parol xato!')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-full max-w-sm p-8 rounded-md shadow-md space-y-6"
      >
        <h1 className="text-2xl font-bold text-center">Kirish</h1>

        {/* Telefon raqam */}
        <div>
          <label className="block mb-1 font-medium">Telefon raqam</label>
          <input
            type="text"
            {...register('phone', { required: 'Telefon raqam kiriting' })}
            className="w-full border rounded-md p-2"
            placeholder="+998901234567"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Parol */}
        <div>
          <label className="block mb-1 font-medium">Parol</label>
          <input
            type="password"
            {...register('password', { required: 'Parol kiriting' })}
            className="w-full border rounded-md p-2"
            placeholder="*******"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Login tugmasi */}
        <button
          type="submit"
          className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-md transition"
        >
          Kirish
        </button>
      </form>
    </div>
  )
}
