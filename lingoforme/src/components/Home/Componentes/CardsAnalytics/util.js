const getNewStudents = arr => {
    let countries = [];
    arr.map(stat => {
        stat.planLanguages.map(p => {
            if (p.lingoLanguage && p.lingoLanguage.flag && countries.indexOf(p.lingoLanguage.flag) < 0 &&
                ['br', 'es', 'us'].indexOf(p.lingoLanguage.flag.toLowerCase()) >= 0) {
                countries.push(p.lingoLanguage.flag);
            }
        })
    });
    const totalCountries = countries.length;
    countries.unshift('');
    countries.push('Total');
    const stats = arr.map(stat => {
        const plans = stat.planLanguages.reduce((a, p) => {
            if (p.lingoLanguage !== null) {
                a.push({
                    quantity: p.studentPlans,
                    country: p.lingoLanguage.flag
                });
            }
            return a;
        }, []);
        let students = Array(totalCountries).fill(0);
        if (plans.length === totalCountries) {
            students = plans.reduce((a, p) => {
                a.push(p.quantity);
                return a;
            }, []);
        } else {
            plans.forEach(item => {
                const index = countries.indexOf(item.country);
                if (index >= 0) {
                    students[index - 1] = item.quantity;
                }
            });
        }
        return [stat.nameEnglish, ...students, stat.studentPlans];
    });
    const result = [countries].concat(stats); 
    return result;
}

const getMonths = () => {
    const arr = [];
    for (let i = 0; i < 12; i++) {
        arr.push(i);
    }
    return arr;
}

const getYearsByYearInterval = interval => {
    const today = new Date();
    const currentYear = today.getUTCFullYear();
    const arr = [];
    for (let i = currentYear + interval; i >= currentYear - interval; i--) {
        arr.push(i);
    }
    return arr;
}

export default {
    getNewStudents,
    getMonths,
    getYearsByYearInterval
}
