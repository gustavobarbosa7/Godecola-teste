import { useEffect, useState } from "react";

const useTimeAgo = (creationDate) => {
    const [timeAgo, setTimeAgo] = useState("");

    useEffect(() => {
        const calculateTimeAgo = () => {
            const currentDate = new Date();
            const parsedCreationDate = new Date(creationDate);

            if (isNaN(parsedCreationDate)) {
                setTimeAgo("Data inválida");
                return;
            }

            const timeDifference = currentDate.getTime() - parsedCreationDate.getTime();

            if (timeDifference < 0) {
                setTimeAgo("No futuro");
                return;
            }

            const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365));
            if (years > 0) {
                setTimeAgo(`${years} ${years === 1 ? "ano" : "anos"}`);
                return;
            }

            const months = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30));
            if (months > 0) {
                setTimeAgo(`${months} ${months === 1 ? "mês" : "meses"}`);
                return;
            }

            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            if (days > 0) {
                const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
                if (hours > 0) {
                    setTimeAgo(
                        `${days} ${days === 1 ? "dia" : "dias"} e ${hours} ${hours === 1 ? "hora" : "horas"
                        }`
                    );
                    return;
                } else {
                    setTimeAgo(`${days} ${days === 1 ? "dia" : "dias"}`);
                    return;
                }
            }

            const hours = Math.floor(timeDifference / (1000 * 60 * 60));
            if (hours > 0) {
                setTimeAgo(`${hours} ${hours === 1 ? "hora" : "horas"}`);
                return;
            }

            const minutes = Math.floor(timeDifference / (1000 * 60));
            if (minutes > 0) {
                setTimeAgo(`${minutes} ${minutes === 1 ? "minuto" : "minutos"}`);
                return;
            }

            setTimeAgo("Menos de um minuto");
        };

        calculateTimeAgo();
    
        const intervalId = setInterval(calculateTimeAgo, 60000);

        return () => {
            clearInterval(intervalId);
        };
    }, [creationDate]);

    return timeAgo;
};

export default useTimeAgo;