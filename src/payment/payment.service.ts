import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import axios from 'axios';
import { sha256 } from 'js-sha256';

@Injectable()
export class PaymentService {
  async payNow(createPaymentDto: CreatePaymentDto): Promise<any> {
    try {
      const { amount, phoneNumber } = createPaymentDto;

      const dateandtime = new Date();

      const dexpiredate = dateandtime.setTime(
        dateandtime.getTime() + 1 * 24 * 60 * 60 * 1000,
      );

      const tre = 'T' + dateandtime.getTime();
      const pp_Amount = amount.toString();
      const pp_BillReference = 'billRef';
      const pp_Description = 'Description';
      const pp_Language = 'EN';
      const pp_MerchantID = 'MC52120';
      const pp_Password = '831ve037uf';

      const pp_ReturnURL = 'http://playpal.herokuapp.com/payment/DoTransaction';
      const pp_ver = '1.1';
      const pp_TxnCurrency = 'PKR';
      const pp_TxnDateTime = dateandtime.toLocaleDateString();
      const pp_TxnExpiryDateTime = dexpiredate;
      const pp_TxnRefNo = tre;
      const pp_TxnType = 'MWALLET';
      const ppmpf_1 = phoneNumber; //mobile number
      const IntegeritySalt = 'dx0w4c93wz';
      const and = '&';
      const superdata =
        IntegeritySalt +
        and +
        pp_Amount +
        and +
        pp_BillReference +
        and +
        pp_Description +
        and +
        pp_Language +
        and +
        pp_MerchantID +
        and +
        pp_Password +
        and +
        pp_ReturnURL +
        and +
        pp_TxnCurrency +
        and +
        pp_TxnDateTime +
        and +
        pp_TxnExpiryDateTime +
        and +
        pp_TxnRefNo +
        and +
        pp_TxnType +
        and +
        pp_ver +
        and +
        ppmpf_1;
      var key = encodeURIComponent(IntegeritySalt);
      var bytes = encodeURIComponent(superdata);
      var hmacSha256 = sha256.hmac.create(key);
      //   var hash = CryptoJS.HmacSHA256(key, IntegeritySalt);
      const sha256Result = hmacSha256.update(bytes).hex();
      var url =
        'https://sandbox.jazzcash.com.pk/ApplicationAPI/API/Payment/DoTransaction';

      var response = await axios.post(url, {
        pp_Version: pp_ver,
        pp_TxnType: pp_TxnType,
        pp_Language: pp_Language,
        pp_MerchantID: pp_MerchantID,
        pp_Password: pp_Password,
        pp_TxnRefNo: tre,
        pp_Amount: pp_Amount,
        pp_TxnCurrency: pp_TxnCurrency,
        pp_TxnDateTime: dateandtime,
        pp_BillReference: pp_BillReference,
        pp_Description: pp_Description,
        pp_TxnExpiryDateTime: dexpiredate,
        pp_ReturnURL: pp_ReturnURL,
        pp_SecureHash: sha256Result,
        ppmpf_1: ppmpf_1,
      });

      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
