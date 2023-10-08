import dayjs from 'dayjs';
import { type NextRequest, NextResponse } from 'next/server';

import ProductConfig from './constants/product.constant';
import { decryptAES256 } from './functions/aes';

export function middleware(request: NextRequest) {
  const etsb = request.cookies.get('etsb')?.value;
  const response = NextResponse.next();
  const doCheck = !etsb && ProductConfig.envVal === ProductConfig.TselKey;

  if (doCheck) {
    const encryptedText = process.env.IRSX_SECRET ?? '';

    if (!encryptedText) {
      return NextResponse.redirect(
        new URL(`/500?msg=Internal Server Error [Error Code]`, request.url)
      );
    }

    const decryptedText = decryptAES256(
      encryptedText,
      '00112233445566778899AABBCCDDEEFF',
      '000102030405060708090A0B0C0D0E0F'
    );

    if (!decryptedText) {
      return NextResponse.redirect(
        new URL(`/500?msg=Internal Server Error. [Error Code]`, request.url)
      );
    }
    const arrOfCode = decryptedText.split('+');
    const serialNum = arrOfCode[2];

    const expiredDateStr = arrOfCode[1] || undefined;

    if (expiredDateStr && serialNum) {
      const expiredDate = dayjs(expiredDateStr).endOf('day');
      const todayDate = dayjs();

      const isTodayAfterExpired = todayDate.isAfter(expiredDate);
      if (isTodayAfterExpired) {
        return NextResponse.redirect(
          new URL(
            `/500?msg=Internal Server Error. Code: ${serialNum}`,
            request.url
          )
        );
      }

      response.cookies.set({
        name: 'etsb',
        value: 'true',
        maxAge: 24 * 60 * 60,
      });
    } else {
      return NextResponse.redirect(
        new URL(
          `/500?msg=Internal Server Error. Code: [Error Code]`,
          request.url
        )
      );
    }
  }

  return response;
}

export const config = {
  matcher: '/',
};
