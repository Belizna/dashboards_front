import { useEffect, useRef, useState } from 'react';
import { Card, Image, Modal, Button } from 'antd';

import './roulette.css';

const { Meta } = Card;

const CARD_WIDTH = 205;
const CARD_GAP = 10;
const CARD_STEP = CARD_WIDTH + CARD_GAP;

const ANIMATION_DURATION = 6000;
const ROUNDS = 8;

const Roulette = ({ cards = [], category }) => {
    const [open, setOpen] = useState(false);
    const [spinning, setSpinning] = useState(false);
    const [winner, setWinner] = useState(null);
    const [position, setPosition] = useState(0);
    console.log(category)
    const windowRef = useRef(null);
    const timerRef = useRef(null);

    const rouletteCards = Array.from(
        { length: ROUNDS + 2 },
        () => cards
    ).flat();


    const startRoulette = () => {
        if (!cards.length || spinning) {
            return;
        }

        setWinner(null);

        setSpinning(false);
        setPosition(0);

        setTimeout(() => {
            const container = windowRef.current;

            if (!container) {
                return;
            }

            const winnerIndex = Math.floor(
                Math.random() * cards.length
            );

            const winnerCard = cards[winnerIndex];

            const finalIndex =
                ROUNDS * cards.length + winnerIndex;

            const containerWidth =
                container.offsetWidth;

            const finalPosition =
                finalIndex * CARD_STEP
                - containerWidth / 2
                + CARD_WIDTH / 2;

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setSpinning(true);
                    setPosition(finalPosition);

                    timerRef.current = setTimeout(() => {
                        setSpinning(false);
                        setWinner(winnerCard);
                    }, ANIMATION_DURATION);
                });
            });
        }, 50);
    };


    const openRoulette = () => {
        setOpen(true);
        setWinner(null);
        setSpinning(false);
        setPosition(0);

        setTimeout(() => {
            startRoulette();
        }, 300);
    };

    const closeModal = () => {
        if (spinning) {
            return;
        }

        setOpen(false);
        setWinner(null);
        setPosition(0);
    };

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    if (!cards.length) {
        return null;
    }

    return (
        <>
            <Button
                type="primary"
                size="large"
                onClick={openRoulette}
            >
                Выбрать случайно
            </Button>

            <Modal
                open={open}
                onCancel={closeModal}
                footer={null}
                centered
                width={1100}
                closable={!spinning}
                maskClosable={!spinning}
                title="Рандом"
            >
                <div className="roulette">
                    <div className="roulette-pointer">
                        <div className="roulette-pointer-arrow">
                            ▼
                        </div>
                    </div>
                    <div
                        ref={windowRef}
                        className="roulette-window"
                    >
                        <div className="roulette-center">
                            <div className="roulette-center-line" />
                        </div>
                        <div className="roulette-gradient roulette-gradient-left" />
                        <div className="roulette-gradient roulette-gradient-right" />

                        <div
                            className={
                                `roulette-track ${spinning
                                    ? 'roulette-track-spinning'
                                    : ''
                                }`
                            }
                            style={{
                                transform:
                                    `translate3d(-${position}px, 0, 0)`
                            }}
                        >

                            {rouletteCards.map((card, index) => (
                                <div
                                    className="roulette-item"
                                    key={`${index}-${card.id ?? card.name}`}
                                >
                                    <Card
                                        hoverable
                                        className="roulette-card"
                                        cover={
                                            <Image
                                                width={CARD_WIDTH}
                                                height={275}
                                                alt={card.name}
                                                src={card.image_key}
                                                preview={false}
                                            />
                                        }
                                    >
                                        <Meta
                                            title={
                                                <div className="roulette-card-title">
                                                    {card.name}
                                                </div>
                                            }
                                        />
                                    </Card>
                                </div>
                            ))}

                        </div>
                    </div>

                    {spinning && (
                        <div className="roulette-status">
                            Выбираем {category}...
                        </div>
                    )}
                    {!spinning && winner && (
                        <div className="roulette-result">

                            <div className="roulette-result-title">
                                🎉 Выпало!
                            </div>

                            <div className="roulette-result-name">
                                {winner.name}
                            </div>

                            <div className="roulette-result-buttons">

                                <Button
                                    type="primary"
                                    size="large"
                                    onClick={startRoulette}
                                >
                                    Крутить ещё раз
                                </Button>

                                <Button
                                    size="large"
                                    onClick={closeModal}
                                >
                                    Закрыть
                                </Button>

                            </div>

                        </div>
                    )}

                </div>
            </Modal>
        </>
    );
};

export default Roulette;