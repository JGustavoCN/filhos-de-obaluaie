/**
 * Utilitários de formatação de datas para o Centro Cultural Filhos de Obaluaiê.
 *
 * O Sanity armazena datetimes como strings ISO 8601 (ex: "2026-11-15T14:00:00.000Z").
 * Estas funções convertem para formatos amigáveis em PT-BR.
 */

/**
 * Formata uma data ISO para exibição amigável em PT-BR.
 * @example formatDate("2026-11-15T14:00:00Z") → "15 de novembro de 2026"
 */
export function formatDate(isoString: string | undefined | null): string {
  if (!isoString) return ''
  try {
    return new Date(isoString).toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'America/Maceio', // GMT-3, fuso de Tobias Barreto – SE
    })
  } catch {
    return isoString
  }
}

/**
 * Formata data ISO para formato curto (dia/mês/ano).
 * @example formatDateShort("2026-11-15T14:00:00Z") → "15/11/2026"
 */
export function formatDateShort(isoString: string | undefined | null): string {
  if (!isoString) return ''
  try {
    return new Date(isoString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      timeZone: 'America/Maceio',
    })
  } catch {
    return isoString
  }
}

/**
 * Formata data ISO incluindo horário.
 * @example formatDateTime("2026-11-15T14:00:00Z") → "15/11/2026, 14h00"
 */
export function formatDateTime(isoString: string | undefined | null): string {
  if (!isoString) return ''
  try {
    const d = new Date(isoString)
    const data = d.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      timeZone: 'America/Maceio',
    })
    const hora = d.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'America/Maceio',
    })
    return `${data}, ${hora.replace(':', 'h')}`
  } catch {
    return isoString
  }
}

/**
 * Formata mês e ano de forma legível.
 * @example formatMonthYear("julho", 2026) → "Julho de 2026"
 */
export function formatMonthYear(mes: string | undefined, ano: number | undefined): string {
  if (!mes && !ano) return ''
  const mesCapitalizado = mes ? mes.charAt(0).toUpperCase() + mes.slice(1) : ''
  if (mesCapitalizado && ano) return `${mesCapitalizado} de ${ano}`
  return mesCapitalizado || (ano ? String(ano) : '')
}

/**
 * Converte número arábico para algarismo romano (para exibição das edições do Encontro).
 * @example toRoman(17) → "XVII"
 */
export function toRoman(num: number | undefined): string {
  if (!num || num < 1 || num > 3999) return num ? String(num) : ''
  const vals = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
  const syms = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I']
  let result = ''
  for (let i = 0; i < vals.length; i++) {
    while (num >= vals[i]) {
      result += syms[i]
      num -= vals[i]
    }
  }
  return result
}
