import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  pantalla: string = "";
  again: boolean = false;

  //digitar
  digitar(element: string) {
    if (this.pantalla == 'NaN' || this.pantalla == 'Infinity') {
      this.pantalla = '';
    }
    if ((element == '+') || (element == '-') || (element == 'x') || (element == '/') || (element == '(') || (element == ')')) {
      this.pantalla += " " + element + " ";
      this.again = false;
    } else {
      if (this.again) {
        this.pantalla = "";
        this.pantalla += element;
        this.again = false;
      } else {
        this.pantalla += element;
      }
    }
  }

  //delete
  deleteElement() {
    if (this.pantalla.lastIndexOf(' ') == this.pantalla.length - 1) {
      this.pantalla = this.pantalla.substring(0, this.pantalla.length - 3);
    } else {
      this.pantalla = this.pantalla.substring(0, this.pantalla.length - 1);
    }
  }

  //is there x or / or () ?
  isX = (elementos: string[]) => {
    for (let i = 0; i < elementos.length; i++) {
      if ((elementos[i] == '(') || ((elementos[i] == ')'))) {
        return i;
      }
    }
    for (let i = 0; i < elementos.length; i++) {
      if (((elementos[i] == '/') || ((elementos[i] == 'x')))) {
        return i;
      }
    }
    return 0;
  }

  //operate
  operate() {
    let operaciones: string[] = this.pantalla.split(' ');
    let aux: number = 0;
    let tam = operaciones.length;

    //console.log('original');
    //console.log(operaciones);
    let op: boolean = false;
    let i = 0;
    let auxBoolean: boolean = true;

    for (i = 0; i < tam; i++) {

      if ((auxBoolean) && this.isX(operaciones) != 0) {
        op = true;
        i = this.isX(operaciones);
      } else {
        op = false;
      }


      if (operaciones[i] == '(') {
        if (operaciones[i + 3] !== ')') {
          i = i + 1;
          auxBoolean = false;
        } else {
          operaciones.splice(i + 2, 1);
          operaciones.splice(i, 1);
          auxBoolean = true;
        }
        //console.log('(');
        //console.log(operaciones);
        op = false;
      } else
        if (operaciones[i] == ')') {
          operaciones.splice(i, 1);
          operaciones.splice(i - 2, 1);
          operaciones.splice(i - 1, 1);
          operaciones.splice(i - 3, 1);

          op = false;
          i = 0;
          auxBoolean = true;

          //console.log(')');
          //console.log(operaciones);
        } else
          if ((operaciones[i] == 'x')) {
            if (operaciones[i - 1] == '') {
              operaciones[i - 1] = '1';
            } else
              if (operaciones[i + 1] == '') {
                operaciones[i + 1] = '1';
              }
            aux = parseFloat(operaciones[i - 1]) * parseFloat(operaciones[i + 1]);
            operaciones[i + 1] = aux.toString();
            operaciones.splice(i, 1);
            operaciones.splice(i - 1, 1);

            //console.log('mutiplicacion');
            //console.log(operaciones);
            if (op) {
              i = 0;
              op = false;
            } else {
              i--;
            }
          } else
            if (operaciones[i] == '/') {
              if (operaciones[i - 1] == '') {
                operaciones[i - 1] = '1';
              } else
                if (operaciones[i + 1] == '') {
                  operaciones[i + 1] = '1';
                }
              aux = parseFloat(operaciones[i - 1]) / parseFloat(operaciones[i + 1]);
              operaciones[i + 1] = aux.toString();
              operaciones.splice(i, 1);
              operaciones.splice(i - 1, 1);

              //console.log('division');
              //console.log(operaciones);
              if (op) {
                i = 0;
                op = false;
              } else {
                i--;
              }
            } else
              if (operaciones[i] == '+') {
                if (operaciones[i - 1] == '') {
                  operaciones[i - 1] = '0';
                  //console.log(operaciones);
                } else
                  if (operaciones[i + 1] == '') {
                    operaciones[i + 1] = '0';
                  }
                aux = parseFloat(operaciones[i - 1]) + parseFloat(operaciones[i + 1]);
                operaciones[i + 1] = aux.toString();
                operaciones.splice(i, 1);
                operaciones.splice(i - 1, 1);

                //console.log('suma');
                //console.log(operaciones);
                i--;
                op = false;
              } else
                if (operaciones[i] == '-') {
                  if (operaciones[i - 1] == '') {
                    operaciones[i - 1] = '0';
                  } else
                    if (operaciones[i + 1] == '') {
                      operaciones[i + 1] = '0';
                    }
                  aux = parseFloat(operaciones[i - 1]) - parseFloat(operaciones[i + 1]);
                  operaciones[i + 1] = aux.toString();
                  operaciones.splice(i, 1);
                  operaciones.splice(i - 1, 1);

                  //console.log('resta');
                  //console.log(operaciones);
                  i--;
                  op = false;
                }
    }
    //console.log('final');
    //console.log(operaciones);
    this.pantalla = operaciones.join('');
    this.again = true;
  }

  //reset
  reset() {
    this.pantalla = "";
  }

  //arrayToString
  arrayToString(array: string[]) {
    this.pantalla = array.join("");
    //console.log(this.pantalla);
  }

  //BinaryToDecimal
  BinaryToDecimal() {
    let C: number = 0;
    if ((this.pantalla.includes('+')) || (this.pantalla.includes('-') || (this.pantalla.includes('x') || (this.pantalla.includes('/')) || (this.pantalla.includes('(')) || (this.pantalla.includes(')'))))) {
      this.pantalla = 'Invalid Value';
    } else {
      let B = this.pantalla.split('');
      for (let i = 0; i < B.length; i++) {
        if (B[i] == '1') {
          C += Math.pow(2, B.length - 1 - i);
        } else {
          C += 0;
        }
      }
    }
    this.pantalla = '' + C;
  }

  //DecimalToBinary
  DecimalToBinary() {
    let A: number[] = [32768, 16384, 8192, 4096, 2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1];
    let C: number = 0;
    let resultado: string = '';
    if ((this.pantalla.includes('+')) || (this.pantalla.includes('-') || (this.pantalla.includes('x') || (this.pantalla.includes('/')) || (this.pantalla.includes('(')) || (this.pantalla.includes(')'))))) {
      this.pantalla = 'Invalid Value';
    } else {
      let numero: number = parseFloat(this.pantalla);
      for (let i = 0; i < A.length; i++) {
        if ((numero >= C + A[i])) {
          resultado += 1;
          C += A[i];
        } else {
          resultado += 0;
        }
      }
    }
    this.pantalla = resultado;
  }
}
