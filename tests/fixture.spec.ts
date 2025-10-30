import {chromium} from 'playwright';
import {test} from '../fixtures/screenSizes';

test.describe('Fixtures test', () => {
    test('Open homepage via small screen', async ({ pageSmall, pageBig, pageMedium }) => {
        await pageSmall.goto('/');
        await pageSmall.waitForTimeout(2000);
    })

    test('Open homepage via medium screen', async ({ pageMedium }) => {
        await pageMedium.goto('/');
        await pageMedium.waitForTimeout(2000);
    })

    test('Open homepage via big screen', async ({ pageBig }) => {
        await pageBig.goto('/');
        await pageBig.waitForTimeout(2000);
    })
})

