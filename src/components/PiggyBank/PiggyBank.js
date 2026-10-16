import React, { useEffect, useMemo, useRef, useState } from 'react';
import './PiggyBank.css';

const MAX_COINS = 64;

const clamp = (value, min, max) => {
    return Math.min(Math.max(value, min), max);
};

const PiggyBank = ({
    amount = 0,
    target = 100000,
    currency = '₽',
    className = ''
}) => {
    const safeAmount = Math.max(Number(amount) || 0, 0);
    const safeTarget = Math.max(Number(target) || 1, 1);

    const progress = clamp(
        safeAmount / safeTarget,
        0,
        1
    );

    const percentage = progress * 100;

    const coinsCount = Math.round(
        progress * MAX_COINS
    );

    const previousCoinsRef = useRef(coinsCount);

    const [coinChange, setCoinChange] = useState(null);
    const [celebrating, setCelebrating] = useState(false);

    /*
     * 64 монеты.
     *
     * Они располагаются слоями снизу вверх.
     * Небольшой deterministic jitter делает
     * кучку более естественной.
     */
    const coins = useMemo(() => {
        const result = [];

        const rows = 8;
        const coinsPerRow = 8;

        for (let row = 0; row < rows; row++) {
            for (let column = 0; column < coinsPerRow; column++) {
                const index =
                    row * coinsPerRow + column;

                const seed =
                    index * 137 + row * 31 + column * 17;

                /*
                 * Основная сетка.
                 */
                const baseLeft =
                    10 + column * 11.4;

                const baseBottom =
                    3 + row * 7.8;

                /*
                 * Небольшое смещение,
                 * чтобы монеты не выглядели идеально ровными.
                 */
                const horizontalJitter =
                    ((seed % 9) - 4) * 0.55;

                const verticalJitter =
                    ((Math.floor(seed / 9) % 5) - 2) * 0.55;

                const rotation =
                    -28 + (seed % 57);

                const scale =
                    0.88 + ((seed * 7) % 15) / 100;

                result.push({
                    id: index,
                    left: baseLeft + horizontalJitter,
                    bottom: baseBottom + verticalJitter,
                    rotation,
                    scale
                });
            }
        }

        return result;
    }, []);

    /*
     * Определяем изменение количества монет.
     */
    useEffect(() => {
        const previousCoins =
            previousCoinsRef.current;

        if (coinsCount > previousCoins) {
            setCoinChange({
                type: 'add',
                count: coinsCount - previousCoins
            });
        }

        if (coinsCount < previousCoins) {
            setCoinChange({
                type: 'remove',
                count: previousCoins - coinsCount
            });
        }

        previousCoinsRef.current = coinsCount;
    }, [coinsCount]);

    /*
     * Анимация достижения 100%.
     */
    useEffect(() => {
        if (progress < 1) {
            return;
        }

        setCelebrating(true);

        const timer = setTimeout(() => {
            setCelebrating(false);
        }, 1100);

        return () => clearTimeout(timer);
    }, [progress]);

    /*
     * Убираем класс изменения после анимации.
     */
    useEffect(() => {
        if (!coinChange) {
            return;
        }

        const timer = setTimeout(() => {
            setCoinChange(null);
        }, 700);

        return () => clearTimeout(timer);
    }, [coinChange]);

    return (
        <div
            className={[
                'piggy-bank-wrapper',

                celebrating
                    ? 'piggy-bank-wrapper--celebrate'
                    : '',

                coinChange?.type === 'add'
                    ? 'piggy-bank-wrapper--adding'
                    : '',

                coinChange?.type === 'remove'
                    ? 'piggy-bank-wrapper--removing'
                    : '',

                className
            ]
                .filter(Boolean)
                .join(' ')}
        >
            <div className="piggy-bank-scene">

                {/* Тень */}
                <div className="piggy-bank-shadow" />

                {/* Свинка */}
                <div className="piggy-bank">

                    {/* Хвост */}
                    <div className="piggy-bank-tail">
                        <span />
                    </div>

                    {/* Основное тело */}
                    <div className="piggy-bank-body">

                        {/* Монеты */}
                        <div className="piggy-bank-coins">
                            {coins.map((coin) => {
                                const active =
                                    coin.id < coinsCount;

                                return (
                                    <div
                                        key={coin.id}
                                        className={[
                                            'piggy-bank-coin',

                                            active
                                                ? 'piggy-bank-coin--active'
                                                : 'piggy-bank-coin--hidden'
                                        ].join(' ')}
                                        style={{
                                            left: `${coin.left}%`,
                                            bottom: `${coin.bottom}%`,

                                            '--coin-rotation':
                                                `${coin.rotation}deg`,

                                            '--coin-scale':
                                                coin.scale
                                        }}
                                    >
                                        <div className="piggy-bank-coin-inner">
                                            {currency}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Стекло / блик */}
                        <div className="piggy-bank-glass">
                            <div className="piggy-bank-highlight" />
                        </div>

                        {/* Верхняя прорезь */}
                        <div className="piggy-bank-slot" />

                        {/* Ножки */}
                        <div className="piggy-bank-leg piggy-bank-leg--left">
                            <span />
                        </div>

                        <div className="piggy-bank-leg piggy-bank-leg--right">
                            <span />
                        </div>

                        {/* Лицо */}
                        <div className="piggy-bank-face">

                            <div className="piggy-bank-ear piggy-bank-ear--left" />

                            <div className="piggy-bank-ear piggy-bank-ear--right" />

                            <div className="piggy-bank-eye piggy-bank-eye--left" />

                            <div className="piggy-bank-eye piggy-bank-eye--right" />

                            <div className="piggy-bank-snout">
                                <span />
                                <span />
                            </div>

                        </div>

                    </div>
                </div>
            </div>

            {/* Информация */}
            <div className="piggy-bank-info">

                <div className="piggy-bank-amount">
                    {safeAmount.toLocaleString('ru-RU')} {currency}
                </div>

                <div className="piggy-bank-target">
                    из {safeTarget.toLocaleString('ru-RU')} {currency}
                </div>

                <div className="piggy-bank-progress">

                    <div className="piggy-bank-progress-track">
                        <div
                            className="piggy-bank-progress-value"
                            style={{
                                width: `${percentage}%`
                            }}
                        />
                    </div>

                    <div className="piggy-bank-percentage">
                        {percentage.toFixed(1)}%
                    </div>

                </div>

            </div>
        </div>
    );
};

export default PiggyBank;