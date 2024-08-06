import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div>
      <h2>No encontrado</h2>
      <p>No se pudo encontrar el recurso solicitado</p>
      <Link href="/">Volver a home</Link>
    </div>
  )
}