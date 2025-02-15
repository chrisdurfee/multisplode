import { A, Article, Div, Section } from "@base-framework/atoms";
import { Levels } from "../../game/level/levels.js";
import { FlashPanel } from "../organisms/flash-panel.js";
import { getSummaryMessage } from "../organisms/summary-message.js";
import { Timer } from "../organisms/timer.js";
import { Page } from "./page.js";

/**
 * This will set up the data.
 *
 * @returns {object}
 */
function beforeSetup()
{
    // @ts-ignore
    const level = this.game.getCurrentLevel();
    this.data = level.data;

    this.data.nextLevel = (level.passed || (!Levels.isNextLevelLocked()));
    this.data.previousLevel = level.number > 1;
}

/**
 * This will setup the states.
 *
 * @returns {object}
 */
function afterSetup()
{
    const level = this.game.getCurrentLevel();
    if (level.number < Levels.activeLevels.length)
    {
        if (level.passed)
        {
            Levels.unlockNextLevel();
        }

        this.state.nextLevel = (level.passed || Levels.isNextLevelLocked());
    }

    const message = getSummaryMessage(level);
    if (message)
    {
        const DURATION = 500;
        const timer = new Timer(DURATION, () =>
        {
            new FlashPanel({
                type: message.type,
                title: message.title,
                description: message.text
            }).start(this.panel);
        });
        timer.start();
    }

    // Initialize AdSense ad unit
    const adContainer = document.getElementById('summary-ad-banner-container');
    if (adContainer) {
        adContainer.innerHTML = `
            <ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-6195383735030855"
     data-ad-slot="6511131121"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
        `;
        (adsbygoogle = window.adsbygoogle || []).push({});
    }
}

/**
 * This will setup the states.
 *
 * @returns {object}
 */
function setupStates()
{
    const level = this.game.getCurrentLevel();
    const { number, passed, highScorePoints, highScoreNumber, particles, scoreNumber, scorePoints, minimum, quantity } = level;

    return {
        number,
        passed,
        highScorePoints,
        highScoreNumber,
        particles,
        scoreNumber,
        scorePoints,
        minimum,
        quantity,
        nextLevel: false,
        previousLevel: number > 1,
    };
}

/**
 * LevelSummaryPage
 *
 * This will create the level summary panel.
 *
 * @param {object} props
 * @returns {object}
 */
export const LevelSummaryPage = ({ game }) => (
    new Page({ game, beforeSetup, afterSetup, setupStates }, [
        Div({ class: 'level-summary-container overlay-panel floatDownZ' }, [
            Div({ class: 'panel-top-button-container' }, [
                A({ class: 'bttn circle bttn-home', href: '/' }, [
                    Div({ class: 'content' })
                ]),
            ]),
            Article({ class: 'summary-col-container' }, [
                Section({ class: 'col marketing-container', id: 'summary-ad-banner-container' }),
                Section({ class: 'col data-container' }, [
                    Div({ class: 'level-summary' }, [
                        Div({ class: 'row' }, [
                            Div({ class: 'level-number-container pullDown' }, [
                                Div({ class: 'level-number title-text' }, '[[number]]'),
                                Div({ class: 'level-label title-text' }, 'Level')
                            ]),
                            Div({ id: 'summaryLevelStatus', class: 'level-status title-enhance', onSet: ['passed', (val) => val? 'Congrats, You Passed' : 'Sorry, Try Again'] }),
                            Div({ class: 'destroyed-summary', onSet: ['passed', { pass: true, fail: false }] }, [
                                Div({ class: 'destroyed' }, [
                                    Div({ class: 'label title-text' }, 'Particle Total'),
                                    Div({ class: 'value' }, '[[quantity]]'),
                                    Div({ class: 'label title-text' }, 'Destroyed'),
                                    Div({ class: 'value' }, '[[scoreNumber]]'),
                                ])
                            ])
                        ]),
                        Div({ class: 'row' }, [
                            Div({ class: 'score-container' }, [
                                Div({ class: 'score-panel' }, [
                                    Div({ class: 'col' }, [
                                        Div({ class: 'data underline' }, [
                                            Div({ class: 'value title-text' }, '[[minimum]]'),
                                            Div({ class: 'label title-enhance' }, 'Minimum'),
                                        ])
                                    ]),
                                    Div({ class: 'col' }, [
                                        Div({ class: 'data circle level-score' }, [
                                            Div({ class: 'content' }, [
                                                Div({ class: 'value title-text' }, '[[scorePoints]]'),
                                                Div({ class: 'label title-enhance' }, 'Level Score'),
                                            ])
                                        ])
                                    ]),
                                    Div({ class: 'col' }, [
                                        Div({ class: 'data high-score underline' }, [
                                            Div({ class: 'value title-text' }, '[[highScorePoints]]'),
                                            Div({ class: 'label title-enhance' }, 'Highest Score'),
                                        ])
                                    ])
                                ])
                            ])
                        ]),
                        Div({ class: 'row summary-button-container' }, [
                            Div({ class: 'summary-buttons' }, [
                                Div({ class: 'col' }, [
                                    Section({ class: 'option-group', id: 'previous_level' }, [
                                        Div({ class: 'bttn circle bttn-prev', onSet: ['previousLevel', { hidden: false }], click: () => game.previousLevel() }, [
                                            Div({ class: 'content' })
                                        ]),
                                        Div({ class: 'label title-text' }, 'Previous')
                                    ]),
                                ]),
                                Div({ class: 'col' }, [
                                    Section({ class: 'option-group', id: 'retry_level' }, [
                                        Div({ class: 'bttn circle bttn-retry', click: () => game.retryLevel() }, [
                                            Div({ class: 'content' })
                                        ]),
                                        Div({ class: 'label title-text' }, 'Retry')
                                    ]),
                                ]),
                                Div({ class: 'col' }, [
                                    Section({ class: 'option-group', id: 'next_level' }, [
                                        Div({ class: 'bttn circle bttn-next', onSet: ['nextLevel', { hidden: false }], click: () => game.nextLevel() }, [
                                            Div({ class: 'content' })
                                        ]),
                                        Div({ class: 'label title-text' }, 'Next')
                                    ])
                                ])
                            ])
                        ])
                    ])
                ])
            ]),
        ])
    ])
);