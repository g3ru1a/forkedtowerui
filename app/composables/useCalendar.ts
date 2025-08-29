export default function() {
    function formatDate(date: Date) {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0') // months are 0-based
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    }

    function getDays(year: number, month: number){
        const result = []
        const firstDay = new Date(year, month, 1)
        const lastDay = new Date(year, month + 1, 0)

        // start from first Monday before or equal to the 1st
        const current = new Date(firstDay)
        while (current.getDay() !== 1) { // 1 = Monday
            current.setDate(current.getDate() - 1)
        }

        while (current <= lastDay || current.getDay() !== 1) {
            result.push(formatDate(current));
            current.setDate(current.getDate() + 1)
        }

        return result;
    }

    return {
        getDays
    }
}