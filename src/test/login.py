from PyQt5 import QtWidgets
# from mainwindow import Ui_MainWindow

class Login(QtWidgets.QDialog):
    def __init__(self, parent=None):
        super(Login, self).__init__(parent)
        self.textName = QtWidgets.QLineEdit(self)
        self.textCode = QtWidgets.QLineEdit(self)
        self.textPass = QtWidgets.QLineEdit(self)
        self.buttonLogin = QtWidgets.QPushButton('Login', self)
        self.buttonLogin.clicked.connect(self.handleLogin)
        layout = QtWidgets.QVBoxLayout(self)
        layout.addWidget(self.textName)
        layout.addWidget(self.textCode)
        layout.addWidget(self.textPass)
        layout.addWidget(self.buttonLogin)
        self.textName.setText('dstarzhynskyi')
        self.textCode.setText('3264')
        self.textPass.setText('123456')
        self.textPass.setFocus()
        print("self.textPass.text().length()")
        str = "this is string example....wow!!!";
        print("Length of the string: ", len(str))
        print("Length of the string: ", len( self.textPass.text() ))
        


    def handleLogin(self):
        #QtWidgets.QMessageBox.warning(
        #        self, 'Error', 'Text '+self.textPass.text()[0])
        
        #if (self.textName.text() == 'foo' and
        #    self.textPass.text() == 'bar'):
        if (len( self.textPass.text() ) == 6):
            self.accept()
        else:
            QtWidgets.QMessageBox.warning(
                self, 'Error', 'Bad user or password '+self.textPass.text())

class Window(QtWidgets.QMainWindow):
    def __init__(self, parent=None):
        super(Window, self).__init__(parent)
        # self.ui = Ui_MainWindow()
        # self.ui.setupUi(self)

if __name__ == '__main__':

    import sys
    app = QtWidgets.QApplication(sys.argv)
    login = Login()
    

    if login.exec_() == QtWidgets.QDialog.Accepted:
        #window = Window()
        #window.show()
        #sys.exit(app.exec_())
        str = 'Ok, '+ 'Execute cpa...'
        print(str)
        